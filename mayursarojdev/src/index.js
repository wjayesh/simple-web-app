require("dotenv").config();
var fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");
const RedditAPI = require("./RedditAPI");

const { BOT_KEY } = process.env;
let { subreddit, sort, notifyInterval } = JSON.parse(
  fs.readFileSync("user_config.json")
);

const bot = new TelegramBot(BOT_KEY, { polling: true });
const reddit = new RedditAPI();

let sentPosts = {};
let timer = null;

// Method to fetch and send latest post
const sendPost = async (message) => {
  console.log(
    `${new Date().toLocaleString()} Fetching posts from ${subreddit}`
  );
  const fetchedPosts = await reddit.fetchSubredditPosts(subreddit, {
    sort,
    limit: 5,
  });
  const { postIds, posts } = fetchedPosts;

  // removing ads, promoted posts
  let filteredPostIds = postIds.filter((id) => id.length < 15);
  // find a unique post, thats not sent before
  let uniquePostId = null;
  for (let postId of filteredPostIds) {
    if (sentPosts[subreddit]) {
      if (!sentPosts[subreddit].includes(postId)) {
        uniquePostId = postId;
        break;
      }
    } else {
      sentPosts[subreddit] = [];
      uniquePostId = postId;
      break;
    }
    console.log(`Skipping ${postId} as previously sent`);
  }
  // send post only if not sent before
  if (uniquePostId !== null) {
    console.log(`Preparing to send ${uniquePostId}`);
    const postDetails = posts[uniquePostId];
    // extract details
    const { id, title, permalink } = postDetails;
    // Other details
    let type = (postDetails.media || {}).type || "link";
    const url = (postDetails.source || {}).url;
    const preview = (postDetails.preview || {}).url;

    // meaningful type rename
    if (type === "rtjson") type = "text";
    // capitalize first letter of type
    type = type.charAt(0).toUpperCase() + type.slice(1);
    // check if post contains media
    const isMediaPost =
      type === "Image" || type === "Video" || type === "Gallery" ? true : false;

    let typeString = type ? `\n➡️Post type: ${type}` : "";
    const urlString = url && !isMediaPost ? `\n🌐Source: ${url}` : "";

    // generate preview only if media available
    const previewString =
      preview && isMediaPost
        ? `\n<a href="${preview}">👀Preview thumbnail</a>`
        : "";

    const constructedMsg = `<b>${title}</b>\n\n🚩r/${subreddit}${typeString}${urlString}${previewString}\n\n<a href="${permalink}">🔴${
      isMediaPost ? "View media" : "View on reddit"
    }</a>`;

    bot.sendMessage(message.chat.id, constructedMsg, {
      parse_mode: "HTML",
    });
    // register post as sent
    sentPosts[subreddit].push(uniquePostId);
    console.log("Post sent to bot\n--------------------------------");
  } else {
    console.log("No new posts left to send!\n--------------------------------");
  }
};

const startUpdatesInterval = async (message) => {
  // Remove any previous intervals to prevent multiple setIntervals
  clearInterval(timer);
  // Start sending updates
  await sendPost(message);

  timer = setInterval(async () => {
    await sendPost(message);
  }, notifyInterval * 60000);
};

bot.onText(/\/start/, async (message) => {
  bot.sendMessage(
    message.chat.id,
    `🔥Bot has started, now sending updates from\n<b>r/${subreddit}</b> every ${notifyInterval}min`,
    {
      parse_mode: "HTML",
    }
  );
  await startUpdatesInterval(message);
});

bot.onText(/\/help/, (message) => {
  bot.sendMessage(
    message.chat.id,
    `/start - start getting updates
/stop - stop getting updates
/subreddit - Change the subreddit
/help - show all commands`,
    { parse_mode: "HTML" }
  );
});

bot.onText(/\/stop/, (message) => {
  // Stop sending updates
  clearInterval(timer);
  console.log("Bot stopped");
});

bot.onText(/\/subreddit (.+)/, async (message, match) => {
  const newSubredditName = match[1];
  if (newSubredditName) {
    // Check if subreddit exists
    const isValid = await reddit.isValidSubreddit(newSubredditName);
    if (isValid) {
      // Stop previous subreddit interval
      clearInterval(timer);
      subreddit = newSubredditName;
      bot.sendMessage(
        message.chat.id,
        `✅Subreddit successfully updated, now sending updates from\n<b>r/${newSubredditName}</b> every ${notifyInterval}min`,
        { parse_mode: "HTML" }
      );
      // Start interval updates from new subreddit
      await startUpdatesInterval(message);
    } else {
      bot.sendMessage(
        message.chat.id,
        `⚠️This subreddit doesnt exist, please check the name again.`
      );
    }
  }
});

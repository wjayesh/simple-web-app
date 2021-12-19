require("dotenv").config();
var fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");
const RedditAPI = require("./RedditAPI");

const { BOT_KEY } = process.env;
const user_config = JSON.parse(fs.readFileSync("user_config.json"));

const bot = new TelegramBot(BOT_KEY, { polling: true });
const reddit = new RedditAPI();

let sentPosts = {};
let timer = null;

const sendPost = async (msg) => {
  console.log(`${new Date().toLocaleString()} Fetching subreddit posts`);

  const fetchedPosts = await reddit.fetchSubredditPosts(user_config.subreddit, {
    sort: user_config.sort,
  });
  const { postIds, posts } = fetchedPosts;

  // removing ads, promoted posts
  let filteredPostIds = postIds.filter((id) => id.length < 15);
  // console.log(filteredPostIds);
  // find a unique post, thats not sent before
  let uniquePostId = null;
  for (let postId of filteredPostIds) {
    if (sentPosts[user_config.subreddit]) {
      if (!sentPosts[user_config.subreddit].includes(postId)) {
        uniquePostId = postId;
        break;
      }
    } else {
      sentPosts[user_config.subreddit] = [];
      uniquePostId = postId;
      break;
    }
    console.log(`Skipping ${postId} as previously sent`);
  }

  if (uniquePostId !== null) {
    console.log(`Preparing to send ${uniquePostId}`);
    const postDetails = posts[uniquePostId];
    const {
      id,
      title,
      permalink,
      source: { url },
    } = postDetails;

    bot.sendMessage(
      msg.chat.id,
      `${title}\nSource: ${url}\n\nReddit: ${permalink}`
    );
    // register post as sent
    sentPosts[user_config.subreddit].push(uniquePostId);
    console.log("Post sent to bot\n--------------------------------");
  } else {
    console.log("No new posts left to send!\n--------------------------------");
  }
};

bot.onText(/\/start/, async (msg) => {
  await sendPost(msg);

  timer = setInterval(async () => {
    await sendPost(msg);
  }, user_config.notifyInterval * 60000);
});

bot.onText(/\/stop/, (message) => {
  clearInterval(timer);
  console.log("Bot stopped");
});

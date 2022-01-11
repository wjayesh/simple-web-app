const axios = require("axios");

class RedditAPI {
  constructor() {
    this.APIBaseUrl = "https://gateway.reddit.com/desktopapi/v1";
    this.APIBaseParams =
      "rtj=only&redditWebClient=web2x&app=web2x-client-production&";
  }

  _objToUrlParams(obj) {
    let urlParams = ``;
    for (let key in obj) {
      urlParams += `${key}=${obj[key]}&`;
    }

    return urlParams;
  }

  _genSubredditAPIUrl(subredditName, params) {
    const subredditBaseUrl = `${this.APIBaseUrl}/subreddits`;
    let subredditAPIUrl = `${subredditBaseUrl}/${subredditName}?${
      this.APIBaseParams
    }${this._objToUrlParams(params)}`;

    return subredditAPIUrl;
  }

  // Public methods
  async fetchSubredditPosts(subredditName, params) {
    const { sort } = params;
    const subredditAPIUrl = this._genSubredditAPIUrl(subredditName, params);

    // Make api call
    try {
      const postsResp = await axios.get(subredditAPIUrl);
      return postsResp.data;
    } catch (error) {
      return {};
    }
  }

  async fetchSubredditInfo(subredditName) {
    const fetchedPosts = await this.fetchSubredditPosts(subredditName, {
      limit: 1,
    });
    const subredditInfo = fetchedPosts.subredditAboutInfo;
    if (subredditInfo != undefined) {
      // returning the nested object
      return subredditInfo[Object.keys(subredditInfo)[0]];
    } else {
      return null;
    }
  }

  async isValidSubreddit(subredditName) {
    return (await this.fetchSubredditInfo(subredditName)) ? true : false;
  }
}

module.exports = RedditAPI;

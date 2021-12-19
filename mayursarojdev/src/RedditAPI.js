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
    let posts = [];
    const subredditAPIUrl = this._genSubredditAPIUrl(subredditName, params);

    // Make api call
    try {
      const postsResp = await axios.get(subredditAPIUrl);
      return postsResp.data;
    } catch (error) {
      return posts;
    }
  }
}

module.exports = RedditAPI;

# 🔔Subreddit Notify

## 📰Description

A telegram bot which sends latest posts of subreddit of your choice. According to the set interval the bot will keep sending the latest updates from the subreddit, untill stopped.

## ✨Features

- 🕐Get periodic updates Example: every 5 minutes.
- 💁Customizable subreddit and interval time.
- 🔥Unique new posts everytime.
- ⏮️If no new posts available, it sends an earlier post untill there are latest updates available.

## 🖼️Demo

#### Bot demo gif

![Bot Demo](demo/demo.gif)
More bot demos in demo folder

## 🤖Bot commands

- /start - start getting updates
- /stop - stop getting updates
- /subreddit - Change the subreddit
- /help - show all commands

## ⏯️Steps

- npm install: Install dependencies
- Create telegram bot using [botfather](https://www.siteguarding.com/en/how-to-get-telegram-bot-api-token), and save the API Key
- Create [.env file](https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/) in the root of project and set BOT_KEY to the bot API key recieved in previous step
- npm run dev: Run the server
- Start the telegram bot with /start command

## 👜Packages used

- node-telegram-bot-api
- axios
- dotenv

## ✍️Author

Mayur Saroj (https://github.com/mayursarojdev)

## 🔒License

Spotify-Notify

This program is free software: However give due credits to @mayursarojdev while using and redistributing the program.

# simple-web-app ✨
Repository to host the demo app and all community-submitted applications for the first episode of the Crio Projects Weekend Workshop!

![simple web app thumbnail](https://user-images.githubusercontent.com/37150991/146527496-3f519436-d6aa-4eb3-a50e-6041b149b38e.png)

## Contributors
| Name | GitHub username | Description |
| ---- | --------------- | ----------- |
| Jayesh Sharma | [wjayesh](https://github.com/wjayesh) | The demo app shows a basic REST API call between a server and a client | 
| Jai Ganesh | [jaiganesh22](https://github.com/jaiganesh22) | The file consists of scheduler and main code file which has the Bot built using espn and telegram apis |


# Overview
We are going to build a simple live cricket scores bot from scratch which shows the latest scores of ongoing games.

# Workflow 
1. Get the list of ongoing games from ESPN cricinfo API.
2. Select the Top 3 games and get the Response for each game from ESPN API.
3. Parse the Information in Responses using JSON and Convert it into Simple Messages to be sent by the bot.
4. Make a Telegram bot using BotFather, configure it with a command to get Scores.(done outside the CODE). 
5. Get the latest requests and Send the Parsed Messages using Telegram API. \
The Required Steps are Explained Further inside the Jupyter Notebook code files.


# Lets test the BOT
Go to telegram and Search for CricketScoreUpdates. \
![image](https://user-images.githubusercontent.com/63280843/146742298-8147387e-4649-4e71-9ec1-c65cd0fbac03.png)

Start the Bot. \
![image](https://user-images.githubusercontent.com/63280843/146742448-d16bfeb7-a6d4-4f3f-9bd2-980a34e1b2bf.png)

Execute /command1 anytime to get the latest Scores and Highlights! \
![image](https://user-images.githubusercontent.com/63280843/146742850-517be22f-d852-4e26-9a28-ae332e0eb769.png)
![image](https://user-images.githubusercontent.com/63280843/146742930-cbde4a1a-1b0c-45ea-a77d-bed0c0fd1504.png)

# Further Extensions
The BOT can be made more interactive to get latest scores, wickets, batsmen, bowlers, Run Rate and other stats with few
tweaks to Messages Generated from JSON and Telegram API.

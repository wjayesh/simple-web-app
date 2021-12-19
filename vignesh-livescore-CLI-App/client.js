require('dotenv').config()
var axios = require("axios").default;
const express = require('express')
const app = express()
const TelegramBot = require('node-telegram-bot-api');
const { API_KEY } = process.env;
const bot = new TelegramBot(API_KEY, { polling: true });
let timer;
let i = 0,
    j = 0,
    k = 0;
let scores = "scores"
const regex = new RegExp(scores, "i");
bot.onText(regex, (msg, match) => {
    const chatId = msg.chat.id;
    var options = {
        method: "GET",
        url: "https://hs-consumer-api.espncricinfo.com/v1/pages/match/details?lang=en&seriesId=1263452&matchId=1263463&latest=true"
    };
    async function getCricScores() {
        const getLiveData = await axios.request(options);
        let match = getLiveData.data.match.slug;
        let series = getLiveData.data.match.series.name;
        let ground = getLiveData.data.match.ground.name;
        let inning = getLiveData.data.match.liveInning;
        bot.sendMessage(chatId, `Match name:\n${match}\nSeries:\n${series}\nGround:\n${ground}\nInning: ${inning}\n\nType 'BallByBall' to get ball by ball commentory\nType 'Batsmen' to get live performance of batsmen\nType 'Bowler' to get live performance of bowlers`);
        bot.onText(/BallByBall/i, (msg, match) => {
            const chatId = msg.chat.id;
            async function timerfunction() {
                timer = setTimeout(async() => {
                    const matchData = await axios.request(options);
                    let commenstArray = matchData.data.recentBallCommentary.ballComments;
                    if (i === 0) { //initiate i with commentary array length 
                        i = commenstArray.length - 1;
                    } //to not send duplicate comments
                    let overNum = commenstArray[i].oversActual;
                    let bowtoBat = commenstArray[i].title;
                    let ballNum = commenstArray[i].ballNumber;
                    let totalRuns = commenstArray[i].totalRuns;
                    let isFourOrSix = (commenstArray[i].isFour) ? "It's a 4" : (commenstArray[i].isSix) ? "It's a 6" : "-";
                    let commentTxt = commenstArray[i].commentTextItems[0].html;
                    let comment = `Bowler to Batsmen: ${bowtoBat}\nComment: ${commentTxt}\nOver Number: ${overNum}\nBall Number: ${ballNum}\nTotal Runs: ${totalRuns}\nIsFourOrSix: ${isFourOrSix}`;
                    bot.sendMessage(chatId, comment);
                    i -= 1;
                    if (i !== 0) //to break the loop
                        timerfunction();
                }, 5000);
            }
            timerfunction();
            bot.onText(/stop/i, (msg, match) => {
                clearTimeout(timer);
            });
        });
        bot.onText(/Batsmen/i, (msg, match) => {
            const chatId = msg.chat.id;
            async function timerfunction() {
                timer = setTimeout(async() => {
                    const matchData = await axios.request(options);
                    let batsmenArray = matchData.data.livePerformance.batsmen;
                    let playerName = batsmenArray[j].player.longName;
                    let playingRole = batsmenArray[j].player.playingRole;
                    let runs = batsmenArray[j].runs;
                    let balls = batsmenArray[j].balls;
                    let sixes = batsmenArray[j].sixes;
                    let fours = batsmenArray[j].fours;
                    let strikeRate = batsmenArray[j].strikerate;
                    let wagonData = batsmenArray[j].wagonData.join(',');
                    let comment = `Player Name: ${playerName}\nPlaying Role: ${playingRole}\nRuns: ${runs}\nBalls: ${balls}\nSixes: ${sixes}\nFours: ${fours}\nStrikeRate: ${strikeRate}\nWagon Data: ${wagonData}`;
                    bot.sendMessage(chatId, comment);
                    j += 1;
                    if (j !== batsmenArray.length) //to break loop
                        timerfunction();
                }, 5000);
            }
            timerfunction();
            bot.onText(/stop/i, (msg, match) => {
                clearTimeout(timer);
            });
        });
        bot.onText(/Bowler/i, (msg, match) => {
            const chatId = msg.chat.id;
            async function timerfunction() {
                timer = setTimeout(async() => {
                    const matchData = await axios.request(options);
                    let bowlersArray = matchData.data.livePerformance.bowlers;
                    let playerName = bowlersArray[k].player.longName;
                    let playingRole = bowlersArray[k].player.playingRole;
                    let team = bowlersArray[k].teamAbbreviation;
                    let overs = bowlersArray[k].overs;
                    let balls = bowlersArray[k].balls;
                    let dots = bowlersArray[k].dots;
                    let maidens = bowlersArray[k].maidens;
                    let wickets = bowlersArray[k].wickets;
                    let economy = bowlersArray[k].economy;
                    let comment = `Player Name: ${playerName}\nPlaying Role: ${playingRole}\nTeam: ${team}\nOvers: ${overs}\nBalls: ${balls}\nDots: ${dots}\nMaidens: ${maidens}\nWickets: ${wickets}\nEconomy: ${economy}`;
                    bot.sendMessage(chatId, comment);
                    k += 1;
                    if (k !== bowlersArray.length) //to break the loop
                        timerfunction();
                }, 5000);
            }
            timerfunction();
            bot.onText(/stop/i, (msg, match) => {
                clearTimeout(timer);
            });
        });
    }
    getCricScores();
});

const port = 3000;
app.listen(port, () => {
    console.log(`Updates App is listening at http://localhost:${port}`)
})
import requests
import json
from bs4 import BeautifulSoup
import schedule
import time


def getScores(url, ball):
    # API request
    req = requests.get(url)
    data = (req.json())

    #gather the data to be pushed on users
    ball_no = (data['content']['recentBallCommentary']['ballComments'][ball]['oversActual'])
    title = (data['content']['recentBallCommentary']['ballComments'][ball]['title'])

    if ((data['content']['recentBallCommentary']['ballComments'][ball]['isFour'])) :
        msg = str(ball_no) + " - " + title + " FOUR"
        return msg

    elif ((data['content']['recentBallCommentary']['ballComments'][ball]['isSix'])) :
        msg = str(ball_no) + " - " + title + " SIX"
        return msg

    elif (data['content']['recentBallCommentary']['ballComments'][ball]['isWicket']) :
        msg = str(ball_no) + " - " + title + " OUT " + (data['content']['recentBallCommentary']['ballComments'][ball]['dismissalText']['long'])
        return msg

    elif (data['content']['recentBallCommentary']['ballComments'][ball]['totalRuns'] > 0) :
        msg = str(ball_no) + " - " + title + " RUNS: " + str((data['content']['recentBallCommentary']['ballComments'][ball]['totalRuns']))
        return msg  

    else :
        return False

def telegram_notify(msg, chat_id):
    import requests
    bot_token = <Your Telegram Bot Token>
    # How to create Telegram Bot Token: https://medium.com/@ManHay_Hong/how-to-create-a-telegram-bot-and-send-messages-with-python-4cf314d9fa3e
    send_text = 'https://api.telegram.org/bot' + bot_token + '/sendMessage?chat_id=' + chat_id + '&parse_mode=Markdown&text=' + msg
    response = requests.get(send_text)
    return response.json()

def cricketScores():
    # API request
    global last_ball_no
    #print (last_ball_no)
    req = requests.get(url)
    data = (req.json())
    if last_ball_no > 0:
        i = -1
        while (data['content']['recentBallCommentary']['ballComments'][i+1]['oversActual']) > last_ball_no and i < 15 :
            i = i + 1
    else :
        i = 15
    last_ball_no = (data['content']['recentBallCommentary']['ballComments'][0]['oversActual'])

    while i >= 0:
        msg = getScores(url, i)
        if (msg) :
            for chat_id in chat_id_list :
                status = telegram_notify(msg, chat_id)
                print(status)
        i = i - 1

    if data['content']['recentBallCommentary']['ballComments'][0]['ballNumber'] == 6 and data['match']['status'] == "Live":
        statusmsg = str(data['content']['recentBallCommentary']['ballComments'][0]['overNumber']) + ' - ' + data['match']['slug'] + 'Innings-' + str(data['match']['liveInning']) + ' ' + data['match']['status'] + ' ' + data['match']['statusText']
        for chat_id in chat_id_list :
            status = telegram_notify(statusmsg, chat_id)
            print(status)

# url for espn cricinfo match api
url = 'https://hs-consumer-api.espncricinfo.com/v1/pages/match/home?lang=en&seriesId=1263452&matchId=1263463'

# Telegram chat_ids of subscribers
chat_id_list = <[Array of chat_ids of your subscribers]>
last_ball_no = 0

# Schedule periodic update
schedule.every().minutes.do(cricketScores)
while True:
    schedule.run_pending()
    time.sleep(1)


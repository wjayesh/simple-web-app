import requests
import time
import constants as key


def cricket_api_call():

    url = "https://cricket-live-data.p.rapidapi.com/match/2586299"
    headers = {
        'x-rapidapi-host': "cricket-live-data.p.rapidapi.com",
        'x-rapidapi-key': key.RAPID_API_KEY
    }
    response = requests.request("GET", url, headers=headers)
    # print(response.text)
    return(response.json())


def telegram_bot_sendtext(bot_message):

    bot_token = key.API_Key
    bot_chatID = key.CHAT_ID
    send_text = f'https://api.telegram.org/bot{bot_token}/sendMessage?chat_id={bot_chatID}&parse_mode=Markdown&text={bot_message}'

    response = requests.get(send_text)

    return response.json()


def main():
    response = cricket_api_call()
    match_title = response["results"]["fixture"]["match_title"]
    telegram_bot_sendtext(match_title)
    toss = response["results"]["live_details"]["match_summary"]["toss"]
    telegram_bot_sendtext(toss)
    status = response["results"]["live_details"]["match_summary"]["status"]
    telegram_bot_sendtext(status)
    while(True):
        time.sleep(150)
        response = cricket_api_call()
        new_status = response["results"]["live_details"]["match_summary"]["status"]
        if status != new_status:
            status = new_status
            telegram_bot_sendtext(status)


if __name__ == "__main__":
    main()

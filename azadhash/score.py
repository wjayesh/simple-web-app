import requests


url = "https://cricket-live-data.p.rapidapi.com/match/2432999"

headers = {
    "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
    "x-rapidapi-key": "7d6f6d05f5msh4b238b93367ff45p18f6fdjsn40813dfaceca",
}

response = requests.request("GET", url, headers=headers)
print(response.json()["results"]["live_details"]["match_summary"]["toss"])

toss = response.json()["results"]["live_details"]["match_summary"]["toss"]
away_score = response.json()["results"]["live_details"]["match_summary"]["away_scores"]
home_score = response.json()["results"]["live_details"]["match_summary"]["home_scores"]
status = response.json()["results"]["live_details"]["match_summary"]["status"]


def send_msg(text):
    url = "https://api.telegram.org/bot{botToken}/sendMessage"  
    #I used botToken so no one an see the bot token

    payload = {
        "text": text,
        "disable_web_page_preview": False,
        "disable_notification": False,
        "chat_id": chat_id,
      #i used chat id so no one can see the chat id
    }
    headers = {"Accept": "application/json", "Content-Type": "application/json"}
    response = requests.request("POST", url, json=payload, headers=headers)

    print(response.text)

send_msg(toss)
send_msg(away_score)
send_msg(home_score)
send_msg(status)

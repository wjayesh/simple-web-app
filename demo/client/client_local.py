import requests
 
# url for the local server
url = 'http://localhost:3000/'

# let's make a request now, to the local Node.js server
req = requests.get(url)

print(req.text)
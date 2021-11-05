import requests

# I am using my key from a separate file. 
# [TASK] Find out the best practice for storing keys. 
from key import key   
 
# url for the local server
url_local = 'http://localhost:3000/'

# url for my Azure Computer Vision instance
url_image_api = 'https://vision-api-jayesh.cognitiveservices.azure.com/'
 
# define headers here
headers = {
    'Ocp-Apim-Subscription-Key': key,     # this is the key that tells Azure that 
    'Content-Type': 'application/json',
    }
 
data = {
    "url":"./images/labrador-pup.jpg"
}

# let's make a request now, passing our url and headers
req = requests.get(url_image_api, headers=headers, data=data)

print(req)
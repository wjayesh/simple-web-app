import requests

# I am using my key from a separate file. 
# [TASK] Find out the best practice for storing keys. 
from key import key   
 

# url for my Azure Computer Vision instance
url_image_api = 'https://vision-api-wjayesh.cognitiveservices.azure.com/vision/v3.2/read/analyze?visualFeatures=Categories,Description&details=Landmarks'
 
# define headers here
headers = {
    'Ocp-Apim-Subscription-Key': key,     # this is the key that tells Azure that 
    'Content-Type': 'application/json',
    }
 
data = {
    "url":"https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/landmark.jpg"
}

# let's make a request now, passing our url and headers
req = requests.post(url_image_api, headers=headers, data=data)


print(req.text)
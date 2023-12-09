import requests
import json

#create a request for an endpoint
baseURL = "https://data.soleadify.com"
endpoint = "/match/v4/companies"
key = "Lk34BnMBMFDj07xGbkQ_aNikeD4_NSKq643WxEEuQUAcjtbrVJStX9FpASw7"
headers = {"x-api-key": key, "Content-Type": "application/json"}
body = {"commercial_names": ["Sapiens"],
		 "address_txt": "Holon, Israel"}

response = requests.post(baseURL + endpoint, headers=headers,json=body)
print(response.json()[])

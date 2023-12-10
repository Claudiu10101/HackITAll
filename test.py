import requests
import json

baseURL = "https://data.veridion.com"
endpoint = "/search/v2/companies?page_size=200"
key = "pXStedvXkA9pMcNK1tWvx_4DesmTsIZ47qfTa6WkqFxgrCvCqJA0mpALQ53J"
headers = {"x-api-key": key, "Content-Type": "application/json"}
body= {
        "filters": {
        "and": [
            {
                "attribute": "company_location",
                "relation": "in",
                "value": [
                    {
						"country": "United Kingdom",
						"city": "Manchester"
                    }
                ],
                "strictness": 3
            } 
        ]
    }
}

response = requests.post(baseURL + endpoint, headers=headers,json=body)
result = response.json()["result"]
for comp in result:
		print(comp["website_url"])

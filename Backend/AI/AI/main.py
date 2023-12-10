import json
import AI
#TO RECEIVE FROM MY IUBIRE ANDREEA
sample_products = "work prottection equipment"
cities=""
radius="100 kilometers"
sample_cities = "Ploiesti"
industries= ""

prompt_cities= "you mmust find all cities around a given city , within a certain given range, from the cities that you know of. Format the output as a single string of these names, separated by commas only.  It is essential and mandatory that the response be formatted as a single string of these names, separated by commas only."
sample_cities="Please find all cities around "+sample_cities + " within a range of "+radius +" Format the output as a single string of these names, separated by commas only.  It is essential and mandatory that the response be formatted as a single string of these names, separated by commas only."
answer_cities=AI.ai_answer(prompt_cities,sample_cities)
print(answer_cities)

print(cities)
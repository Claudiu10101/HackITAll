import json
import AI
#TO RECEIVE FROM MY IUBIRE ANDREEA
sample_products = "work prottection equipment"
cities=""
radius="100 kilometers"
sample_cities = "Ploiesti"
industries= ""


prompt_cities="Please find all cities around "+sample_cities + "within a range of "+radius +" Format the output as a single string of these names, separated by commas only.  It is essential and mandatory that the response be formatted as a single string of these names, separated by commas only."
print(prompt_cities)

prompt_products = """
Given a product name, generate a list of alternative names for this product. The alternative names should include how other companies might name this product, more specific types of this product, and related industry terms. Aim to provide at least 30 alternatives, but try to include as many as possible. This list is intended for use in searching a database of manufacturers, so consider common search algorithms and database indexing methods in generating these alternatives. Ensure that the alternatives are relevant and diverse, covering a wide range of possible variations and synonyms.  Format the output as a single string of these names, separated by commas only.
It is essential and mandatory that the response be formatted as a single string of these names, separated by commas only.
"""
prompt_industries = """Given a list of products, provide the names of about 5 industries that manufacture those items.Each industry name should be concise. Format the output as a single string of these names, separated by commas only.
 It is essential and mandatory that the response be formatted as a single string of these names, separated by commas only.
"""

prompt_cities = """
"""
answer=AI.ai_answer(prompt_products,sample_products)
products=AI.vectorise(answer)

industries_answer=AI.ai_answer(prompt_industries,answer)
industries=AI.vectorise(industries_answer)




print(products)
print("#########################################################")

print(industries)

filename = "data.json"

data = {
    "products": products,
    "cities" : cities,
    "industries": industries,
}

with open(filename, "w") as json_file:
    json.dump(data, json_file)

with open(filename, "r") as json_file:
    loaded_data = json.load(json_file)
    print(json.dumps(loaded_data, indent=4))
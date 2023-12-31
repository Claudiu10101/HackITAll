import AI
import json
import image_AI
import sys

data = json.loads(sys.stdin.read())

system_promt= """
Your task is to generate the content of a pitch presentation for selling a product to a company.
You will receive information about the company that should by my product, the product, and the client company. 
You must provide the best possible pitch for the client company to sell the product to the company given the input.
A complete presentation must be provided, you are not allowed to include information that should be completed
The text must be formated the following way:
    each slide's content must be precedet by '$'
    after the '$' sign do not write the word "slide"
    There should only be eight slides in the presentation
    Each slide should contain at most 120 words , only concise ideeas , suitable for bullet-points
any response not generated in this manner is considered incorect
"""
my_product=data["about"]
my_market=''' 
i am looking to sell my poducts to all types of companies

'''
my_target = """those are the detalis of my potential client: 
"""
sample=my_product

file_path = "Backend/AI/real_response.json"
def custom_json_parser(num_str):
    return str(num_str)


sample += "main country: " + str(data["main_country"])
sample += " main region: " + str(data["main_region"])
sample += " main city: " + str(data["main_city"])
sample += " number of locations: " + str(data["num_locations"])
sample += " company type: " + str(data["company_type"])
sample += " year founded: " + str(data["year_founded"])
sample += " employee count: " + str(data["employee_count"])  
sample += " estimated revenue: " + str(data["estimated_revenue"])
sample += " description: " + str(data["long_description"])
sample += " business tags: " + str(data["business_tags"])
sample += " main business category: " + str(data["main_business_category"])
sample += " main industry: " + str(data["main_industry"])
sample += " company name: " + str(data["company_name"])

answer=AI.ai_answer(system_promt,sample)
answer_final=AI.parser(answer)

file_path = "presentation/textfile.txt"
with open(file_path, "w") as file:
    for i in range(8):
        file.write("Slide ")
        file.write(str(i+1))
        file.write(" Text is:\n")
        file.write(answer_final[i+1])

for i in range(8):
    print("Slide ")
    print(str(i+1))
    print(" Text is:\n")
    print(answer_final[i+1])

sample="create an image designed to take text in the center area , the general theme of the image should be: "
extra_query="use this text as insipiration also: "
for i in range(8):
    image_promt=sample+my_product+extra_query+answer_final[i]
    image_AI.image_generator(image_promt,i)














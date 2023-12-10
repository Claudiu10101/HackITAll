import AI
import json
import image_AI
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
my_product=""" 
The product that i am selling is cofee and coffe beans, in any quantity
 """
my_market=''' 
i am looking to sell my poducts to all types of companies

'''
my_target = """those are the detalis of my potential client: 
"""
sample=my_product

file_path = "Backend/AI/real_response.json"
def custom_json_parser(num_str):
    return str(num_str)

with open(file_path, 'r') as file:
    data = json.load(file, parse_float=custom_json_parser)

    # Accessing data from the first entry in the JSON array
    first_entry = data[0]
    
    # Access specific fields within the first entry
    sample += "main country: " + str(first_entry["main_country"])
    sample += " main region: " + str(first_entry["main_region"])
    sample += " main city: " + str(first_entry["main_city"])
    sample += " number of locations: " + str(first_entry["num_locations"])
    sample += " company type: " + str(first_entry["company_type"])
    sample += " year founded: " + str(first_entry["year_founded"])
    sample += " employee count: " + str(first_entry["employee_count"])  
    sample += " estimated revenue: " + str(first_entry["estimated_revenue"])
    sample += " description: " + str(first_entry["long_description"])
    sample += " business tags: " + str(first_entry["business_tags"])
    sample += " main business category: " + str(first_entry["main_business_category"])
    sample += " main industry: " + str(first_entry["main_industry"])
    sample += " company name: " + str(first_entry["company_name"])

answer=AI.ai_answer(system_promt,sample)
answer_final=AI.parser(answer)
print(answer)

file_path = "presentation/textfile.txt"
with open(file_path, "w") as file:
    for i in range(8):
        file.write("Slide ")
        file.write(str(i+1))
        file.write(" Text is:\n")
        file.write(answer_final[i+1])

sample="create an image designed to take text in the center area , the general theme of the image should be: "
extra_query="use this text as insipiration also: "
for i in range(8):
    image_promt=sample+my_product+extra_query+answer_final[i]
    image_AI.image_generator(image_promt,i)














import json

# Define the file path relative to the project folder
file_path = "Backend/AI/real_response.json"
def custom_json_parser(num_str):
    return str(num_str)

with open(file_path, 'r') as file:
    data = json.load(file, parse_float=custom_json_parser)

    # Accessing data from the first entry in the JSON array
    first_entry = data[0]
    
    # Access specific fields within the first entry
    sample = "main country: " + str(first_entry["main_country"])
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


    
    # Print the company name
    print(sample)

import json

# Define the file path relative to the project folder
file_path = "real_response.json"


with open(file_path, 'r') as file:
    data = json.load(file)

    # Accessing data from the first entry in the JSON array
    first_entry = data[0]
    
    # Access specific fields within the first entry
    sample = first_entry["main_country"]
    sample+= first_entry["main_region"]
    sample+= first_entry["main_city"]
    sample+= first_entry["num_locations"]
    sample+= first_entry["company_type"]
    sample+= first_entry["year_founded"]
    sample+= first_entry["employee_count"]
    sample+= first_entry["estimated_revenue"]
    sample+= first_entry["long_description"]
    sample+= first_entry["business_tags"]
    sample+= first_entry["main_country"]
    sample+= first_entry["main_country"]
    sample+= first_entry["main_country"]
    sample+= first_entry["main_country"]
    sample+= first_entry["main_country"]
    sample+= first_entry["main_country"]
    sample+= first_entry["main_country"]
    sample+= first_entry["main_country"]
    sample+= first_entry["main_country"]


    
    # Print the company name
    print(sample)

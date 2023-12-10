import json
import AI
    #TO RECEIVE FROM MY IUBIRE ANDREEA
def client(radius,sample_cities, country, company_description):    #sample_products = "work prottection equipment"
    sample=company_description
    client_system_promt="""
    Task: Identify NAICS Codes for Potential Clients

    Input: Company description, including business nature, products or services, target market, and other details.

    Process: Analyze the description to determine the company's industry and niche, and identify potential client industries for their products or services.

    Output: Provide a string of NAICS codes representing potential clients, formatted as a space-separated string of codes.

    Constraints: Focus on the most likely client industries, output only NAICS codes in the specified format, maintain confidentiality, and exclude all information except the NAICS codes.
    it is mandatory and very important that only a set of numbers separated by a space be outputed , any other response in incorrect 
    """ 

    city_system_promt="""Task: Generate a List of Nearby Cities

    Input: Receive a specific city and a distance range.

    Process: Based on the provided city and distance, identify cities located within that distance range. Use existing knowledge to determine these cities.

    Output: Present a list of identified cities, formatted exclusively as a string of city names. The names should be separated by commas without any additional information or formatting.

    Constraints: The response must strictly adhere to the format of a comma-separated string of city names. Do not include any information beyond the names of the cities within the specified distance range.
    it is mandatory and very important that only a set of city names separated by a comma without a space after it be outputed , any other response in incorrect 

    """

    cities_final_sample="Find all cities aproximetly "+ radius +" around " + sample_cities


    #TO DO STRIP
    naics_initital_answer=AI.ai_answer(client_system_promt,sample)
    naics_answer=AI.vectorise(naics_initital_answer)

    city_initital_answer=AI.ai_answer(city_system_promt,cities_final_sample)
    city_final_answer=AI.vectorise_comma(city_initital_answer)


    filename = "data.json"


    data = {
        "NAICS": naics_answer,
        "cities" : city_final_answer,
        "country": country
    }

    



    with open(filename, "w") as json_file:
        json.dump(data, json_file)

    with open(filename, "r") as json_file:
        loaded_data = json.load(json_file)
        print(json.dumps(loaded_data, indent=4))
    






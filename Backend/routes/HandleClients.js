require('dotenv').config()

const axios = require("axios");
const express = require("express");
const business = require('../schemas/business');
const router = express.Router();

const api_search = axios.create({
	baseURL: "https://data.veridion.com/search/v2/companies?page_size=10",
	headers: {
		"x-api-key": "pXStedvXkA9pMcNK1tWvx_4DesmTsIZ47qfTa6WkqFxgrCvCqJA0mpALQ53J",
		"Content-Type": "application/json"
	}
})

const api_enrich = axios.create({
	baseURL: "https://data.veridion.com/match/v4/companies",
	headers: {
		"x-api-key": "Lk34BnMBMFDj07xGbkQ_aNikeD4_NSKq643WxEEuQUAcjtbrVJStX9FpASw7",
		"Content-Type": "application/json"
	}
})

router.post("/:id/enrich", authenticateToken, async (req, res) => { 
	try {
		api_enrich.post("", req.body).then(async (response) => {
			const target = await business.findById(req.params.id)
			target.clients.push(req.body)
			await target.save()
			res.status(200).json(response.data)
		})
	} catch (err) {
		res.status(500).json({ message: err });
	}
})

router.post("/" ,async (req, res) => { 
	try {
		const cities = []
		for(city in req.body.cities) {
			cities.push({
				"country": req.body.country,
				"city": req.body.cities[city]
			})
		}
		const NAICS = req.body.NAICS;
		console.log(NAICS)
		let final_result = []
		for (let naics_index = 0; naics_index < NAICS.length; naics_index++){
			const query = {
				"filters": {
					"and": [
						{
							"attribute": "company_naics_code",
							"relation": "equals",
							"value": NAICS[naics_index],
						},
						{
							"attribute": "company_location",
							"relation": "in",
							"value": cities,
							"strictness" : 1, 
						}
					]
				}
			}

			await api_search.post("", query).then((response) => {
				const result = response.data.result;
				console.log(response.status)

				for (let index = 0; index < 2 && index<result.length;index++) {
					final_result.push(
						{
                            "main_country":response.data.result[index]["main_country"],
                            "main_region":response.data.result[index]["main_region"],
                            "main_city":response.data.result[index]["main_city"],
                            "num_locations":response.data.result[index]["num_locations"],
                            "company_type":response.data.result[index]["company_type"],
                            "year_founded":response.data.result[index]["year_founded"],
                            "employee_count":response.data.result[index]["employee_count"],
                            "estimated_revenue":response.data.result[index]["estimated_revenue"],
                            "long_description":response.data.result[index]["long_description"],
                            "business_tags":response.data.result[index]["business_tags"],
                            "main_business_category":response.data.result[index]["main_business_category"],
                            "main_industry":response.data.result[index]["main_industry"],
                            "main_sector":response.data.result[index]["main_sector"],
                            "naics_2022":response.data.result[index]["naics_2022"],
							"company_name": response.data.result[index]["company_name"],
							"website": response.data.result[index]["website_url"],
						})
				}
			})
		}
		console.log(final_result);
		res.status(200).json(final_result)
	} catch (err) {
		res.status(500).json({ message: err });
	}

})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user.user
        next()
    })
}

module.exports = router
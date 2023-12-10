require('dotenv').config()


const { spawn } = require('child_process');
const axios = require("axios");
const express = require("express");
const User = require('../schemas/user');
const { json } = require('body-parser');
const jwt = require("jsonwebtoken");
const router = express.Router();

const api_search = axios.create({
	baseURL: "https://data.veridion.com/search/v2/companies?page_size=10",
	headers: {
		"x-api-key": "pXStedvXkA9pMcNK1tWvx_4DesmTsIZ47qfTa6WkqFxgrCvCqJA0mpALQ53J",
		"Content-Type": "application/json"
	}
})

router.post("/" ,authenticateToken ,async (req, res) => { 
	const py = spawn('python3', ['AI/client_searcher.py'])

	const request = {
		"city": req.user.city,
		"country": req.user.country,
		"description": req.user.about,  
	}

	console.log(request)

	py.stdin.write(JSON.stringify(request))
	py.stdin.end()

	let requestCities = []
	let requestNAICS = []

	await new Promise((resolve) => {
		py.stdout.on('data', (data) => {
			data = JSON.parse(data.toString())
			requestCities = data["cities"]
			requestNAICS = data["NAICS"]
		  });
		  
		  py.stderr.on('data', (data) => {
			console.error(data.toString());
		  });
		py.on('close', () => {
			resolve();
		  });
	}
	)

	console.log(requestCities)

	try {
		const cities = []
		for (let i = 0; i < requestCities.length; i++) {
			cities.push({
				"country": req.user.country,
				"city": requestCities[i]
			})
		}
		const NAICS = requestNAICS;
		console.log(cities)
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
				if (result.length == 0) {
					console.log("no results")
				}
				else {
					console.log(response.status)
					final_result.push(
						{
							"main_country": response.data.result[0]["main_country"],
							"main_region": response.data.result[0]["main_region"],
							"main_city": response.data.result[0]["main_city"],
							"num_locations": response.data.result[0]["num_locations"],
							"company_type": response.data.result[0]["company_type"],
							"year_founded": response.data.result[0]["year_founded"],
							"employee_count": response.data.result[0]["employee_count"],
							"estimated_revenue": response.data.result[0]["estimated_revenue"],
							"long_description": response.data.result[0]["long_description"],
							"business_tags": response.data.result[0]["business_tags"],
							"main_business_category": response.data.result[0]["main_business_category"],
							"main_industry": response.data.result[0]["main_industry"],
							"main_sector": response.data.result[0]["main_sector"],
							"naics_2022": response.data.result[0]["naics_2022"],
							"company_name": response.data.result[0]["company_name"],
							"website": response.data.result[0]["website_url"],
						})
				}
				}
			)
		}
		console.log(final_result);
		res.status(200).json(final_result)
	} catch (err) {
		res.status(500).json({ message: err });
	}

})

router.post("/pitch", authenticateToken, async (req, res) => { 
	try {
		const py = spawn('python3', ["AI/presentation_generator.py"])

		const body = {
			"about": req.user.about,
			"main_country": req.body.main_country,
			"main_region": req.body.main_region,
			"main_city": req.body.main_city,
			"num_locations": req.body.num_locations,
			"company_type": req.body.company_type,
			"year_founded": req.body.year_founded,
			"employee_count": req.body.employee_count,
			"estimated_revenue": req.body.estimated_revenue,
			"long_description": req.body.long_description,
			"business_tags": req.body.business_tags,
			"main_business_category": req.body.main_business_category,
			"main_industry": req.body.main_industry,
			"main_sector": req.body.main_sector,
			"naics_2022": req.body.naics_2022,
			"company_name": req.body.company_name,
			"website": req.body.website_url
		}

		py.stdin.write(JSON.stringify(body))
		py.stdin.end()

		let pitch = ""

		await new Promise((resolve) => {
			py.stdout.on('data', (data) => {
				pitch = data.toString()
				pitch = pitch.slice(0,pitch.length-514)
				console.log(pitch)
			  });
			  
			  py.stderr.on('data', (data) => {
				console.error(data.toString());
			  });
			py.on('close', () => {
				resolve();
			  });
		}
		)
		res.status(200).json(pitch)
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
		req.user = new User({
			email: "Claudiu123",
			password: "String",
			about: "I am a small compay that produces coffee beans and coffee",
			city: "New York",
			country: "United States",
		})
        next()
    })
}

module.exports = router
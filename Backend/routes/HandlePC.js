require('dotenv').config()

const axios = require("axios");
const express = require("express");
const router = express.Router();

const api = axios.create({
	baseURL: "https://data.veridion.com/search/v2/companies",
	headers: {
		"x-api-key": "pXStedvXkA9pMcNK1tWvx_4DesmTsIZ47qfTa6WkqFxgrCvCqJA0mpALQ53J",
		"Content-Type": "application/json"
	}
})


router.post("/", authenticateToken ,async (req, res) => { 
	try {
		const cities = req.body.cities;
		const products = req.body.products;
		const possible_industries = req.body.industries;
			query = {
				"filters": {
					"and": [
						{
							"attribute": "company_products",
							"relation": "match_expression",
							"value": {
								"match": {
									"operator": "or",
									"operands": products
								}
							}
						},
						{
							"or": [
								{
									"attribute": "company_industry",
									"relation": "in",
									"value": possible_industries
								},
								{
									"attribute": "company_category",
									"relation": "in",
									"value": possible_industries
								}
							]
						},
						{
							"attribute": "company_location",
							"relation": "in",
							"value":
							{
								"city": cities
							},
							"strictness": 3
						}
					]
				}
		}

		api.post("", query).then((response) => { 
			res.status(200).json(response.data)
		})

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
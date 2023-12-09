require('dotenv').config()

const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post('/Login', getUserByEmail, async (req, res) => {
	try {
		if (await bcrypt.compare(req.body.password, res.User.password)) {
			const user = res.User
			const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET)
			res.status(200).json({ token: token })
		}
		else {
			res.status(403).json({ Message: "Password incorrect" })
		}
	}
	catch (err) {
		res.status(500).json({ Message: err.message })
	}
})

router.patch('/Business', authenticateToken, async (req, res) => { 
	try {
		res.User.businesses.push(req.body.business)
	} catch (err) { 
		res.status(500).json({ Message: err.message }) 
	}
	})

router.delete('/Business', authenticateToken, async (req, res) => {
	try {
		res.User.businesses.splice(res.User.businesses.indexOf(req.body.business), 1)
		await res.User.save()
		res.json({ Message: "Business deleted" }) 
	
	} catch (err) { 
		res.status(500).json({ Message: err.message }) 
	}
})

router.post('/', async (req, res) => {
	const search = await User.find({ email: req.body.email })

	if (search.length != 0) {
		res.status(409).json({ message: "Email already used" })
	}
	else {
		const newUser = new User({
			email: req.body.email,
			password: await bcrypt.hash(req.body.password, 10),
			businesses: null
		})

		try {
			const user = await newUser.save();
			const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET)
			res.status(200).json({ token: token })
		} catch (err) {
			res.status(500).json({ Message: err.message })
		}
	}
})


async function getUserByEmail(req, res, next) {
	let user;
	try {
		user = await User.findOne({ email: req.body.email })

		if (user == null) {
			return res.status(404).json({ Message: "Cannot find user" })
		}
	} catch (err) {
		return res.status(500).json({ Message: err.message })
	}
	console.log(user)
	res.User = user;
	next();
}
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
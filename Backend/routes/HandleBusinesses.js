require('dotenv').config()

const express = require("express");
const router = express.Router();
const Business = require("../schemas/business");
const User = require("../schemas/user");
const jwt = require('jsonwebtoken');

router.get('/', authenticateToken ,async (req, res) => {
    try {
        businesses = await Business.find({ Owner: req.user._id })
        res.status(200).json(businesses)
    } catch (err) {
        res.status(500).json({ Message: err.message })
    }
})

router.post('/', authenticateToken, async (req, res) => { 
    try {
        const business = new Business({
            Name: req.body.name,
            Owner: req.user._id,
            Clients: [],
            Partners: []
        })
        await business.save()
        res.status(201).json(business)
    
    } catch (err) {
        res.status(400).json({ Message: err.message })
    }

})

router.delete('/:id', [authenticateToken, getBusiness], async (req, res) => {
    try {
        if (req.user._id == res.Business.Owner) {
            await Business.findByIdAndDelete(req.params.id)
            res.status(200).json({ Message: "Business deleted" })
        }
        else {
            res.status(403).json({ Message: "Not the owner" })
        }
    } catch (err) {
        res.status(500).json({ Message: err.message })
    }


})


router.delete('/:id/clients', [authenticateToken, getUser], async (req, res) => { 
    try {
        res.Business.clients.splice(res.Business.clients.indexOf(req.body.client), 1)
        await res.Business.save()
        res.status(200).json({ Message: "Client deleted" })
    } catch (err) { 
        res.status(500).json({ Message: err.message }) 
    }
})

router.delete('/:id/partners', [authenticateToken, getUser], async (req, res) => { 
	try {
        res.Business.partners.splice(res.Business.partners.indexOf(req.body.partner), 1)
		await res.User.save()
		res.status(200).json({ Message: "Partner deleted" })
	} catch (err) {
		res.status(500).json({ Message: err.message })
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

async function getBusiness(req, res, next) {
    let business;
    try {
        business = await Business.findById(req.params.id)
        if (business == null) {
            return res.status(404).json({ Message: "Cannot find business" })
        }
    } catch (err) {
        return res.status(500).json({ Message: err.message })
    }

    res.Business = business;
    next();
}

module.exports = router
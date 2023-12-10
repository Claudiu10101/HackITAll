const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
	email: String,
	password: String,
	about: String,
	city: String,
	country: String,
	clients: [{
		name: String,
		website: String,
		phone_number: String,
	}]
})

module.exports = mongoose.model("User", userShema);
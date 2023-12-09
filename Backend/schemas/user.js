const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
	email: String,
	password: String,
	businesses: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model("User", userShema);
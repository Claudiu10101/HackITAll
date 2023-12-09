const mongoose = require('mongoose')

const businessShema = new mongoose.Schema({
	name: String,
	main_category: String,
	main_products: [String],
	clients: [
		mongoose.SchemaTypes.ObjectId
	],
	partners: [
		mongoose.SchemaTypes.ObjectId
	],
	owner : mongoose.SchemaTypes.ObjectId
})

module.exports = mongoose.model("Business", businessShema);
const mongoose = require('mongoose')

const businessShema = new mongoose.Schema({
	name: String,
	main_category: String,
	main_products: [String],
	clients: [String],
	partners: [String],
	owner : mongoose.SchemaTypes.ObjectId
})

module.exports = mongoose.model("Business", businessShema);
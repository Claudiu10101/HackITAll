const mongoose = require('mongoose')

const businessShema = new mongoose.Schema({
	name: String,
	main_category: String,
	main_products: [String],
	clients: [{
		name: String,
		website: String,
		phone_number: String,
	}],
	owner : mongoose.SchemaTypes.ObjectId
})

module.exports = mongoose.model("Business", businessShema);
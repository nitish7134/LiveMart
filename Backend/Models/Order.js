var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Order = new Schema({
	TotalPrice: Number,
	Items: [{
		Item: mongoose.Schema.ObjectId,
		Sellers: [{
			Seller: mongoose.Schema.ObjectId,
			Quantity_to_buy: Number,
			Price: Number,
			Name: String,
		}]
	}],
	statusCode: Number,
	orderType: Number, //0 for online 1 for offline
	Address: {
		shippingAddress1: {
			type: String,
			required: true,
		},
		shippingAddress2: {
			type: String,
		},
		city: {
			type: String,
			required: true,
		},
		zip: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		}
	},
	ExpectedDelivery: Date,
	phone: String
});
module.exports = mongoose.model("Order", Order);

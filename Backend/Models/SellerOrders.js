var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Order = require('./Order').schema
var SellerOrder = new Schema({
    Seller: mongoose.Schema.ObjectId,
    Customer: mongoose.Schema.ObjectId,
    orderType:String,
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
    phoneNo:String,
    Items: [{
        item: mongoose.Schema.ObjectId,
        QuantityBought: Number
    }],
},{
    timestamps:true
});


module.exports = mongoose.model("SellerOrder", SellerOrder);

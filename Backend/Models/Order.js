var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cart = require('./Cart').schema;


var Order = new Schema({
    Cart: Cart,
    SellerRole: Number,
    Customer: mongoose.Schema.ObjectId,
    Seller: mongoose.Schema.ObjectId,
    statusCode: Number,
    Address:String,
    ExpectedDelivery: Date
});

module.exports = mongoose.model('Order', Order);

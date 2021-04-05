var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cart = require('./Cart.js');


var Order = new Schema({
    Cart: Cart,
    SellerRole: Number,
    Customer: mongoose.Schema.ObjectId,
    Seller: mongoose.Schema.ObjectId,
    statusCode: Number,
    ExpectedDelivery: Date
});

module.exports = mongoose.model('Order', Order);

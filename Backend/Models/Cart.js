var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
    Address: String,
    TotalPrice: Number,
    Items: [{
        Item: mongoose.Schema.ObjectId,
        Selers: [{
            Seller: mongoose.Schema.ObjectId,
            Quantity_to_buy: Number
        }]
    }]
}, {
    timestamp: true
});

module.exports = mongoose.model('Item', Item);
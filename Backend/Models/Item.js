var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({
    Name: {
        type: String,
        default: ''
    },
    Seler: {
        type: Number,
        default: 0 //0 for Retailer, 1 for WholeSaler
    },
    Category: {
        type: String,
        required: true
    },
    TotalQuantity: {
        type: Number,
        default: 0
    },
    NextAvailDate: Date,
    Sellers: [{
        Price: Number,
        Quantity: Number,
        Name: String,
        Seller: mongoose.Schema.ObjectId,
    }]
}, {
    timestamp: true
});

module.exports = mongoose.model('Item', Item);
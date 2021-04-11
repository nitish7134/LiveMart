var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Items = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    Seller: {
        type: Number,//0 for Retailer, 1 for WholeSaler
        required: true
    },
    TotalQuantity: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: String,
    brand: String,
    NextAvailDate: Date,
    isFeatured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    Sellers: [{
        Price: Number,
        Quantity: Number,
        Name: String,
        Seller: mongoose.Schema.ObjectId
    }]
}, {
    timestamp: true
});


module.exports = mongoose.model('Items', Items);
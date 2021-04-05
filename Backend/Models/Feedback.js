var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Feedback = new Schema({
    AddressedTo: {
        type: String,
        required: true
    },
    AddressedToID: mongoose.Schema.ObjectId,
    AddressedFromID: mongoose.Schema.ObjectId,
    Query: {
        type: String,
        required: true
    },
    Reply: String
}, {
    timestamp: true
});

module.exports = mongoose.model('Feedback', Feedback);
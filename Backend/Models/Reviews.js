var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema({
    Item: mongoose.Schema.ObjectId,
    review: {
        type: [{
            type: String
        }],
        default: []
    }
});
module.exports = mongoose.model('Review', Review);

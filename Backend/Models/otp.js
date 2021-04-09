var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var otpschema = new Schema({
    user: mongoose.​Types.ObjectId,
    otp: String,
    sessionActivity: { type: Date, expires: '600s', default: Date.now }, // Expire after 15 s
});
module.exports = mongoose.model('otpschema', otpschema);

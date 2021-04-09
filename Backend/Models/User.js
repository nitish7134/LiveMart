var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cart = require('./Cart.js').schema;
var Notification = require('./Notification.js').schema;


var User = new Schema({
    Name: {
        type: String,
        required:true
    },
    PaymentAddress: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: "Customer"
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    phoneNo: {
        type: String, trim: true, index: true, unique: true, sparse: true
    },
    password: {
        type: String,
    },
    facebookId: String,
    googleId: String,
    Notifications: [Notification],
    FeedbacksGiven: [{ Feedback: mongoose.Schema.ObjectId }],
    FeedbacksReceived: [{ Feedback: mongoose.Schema.ObjectId }],
    cart: Cart
}, {
    timestamp: true
});


User.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }
            user.password = hash;
            next()
        })

    })

})


User.methods.comparePassword = function (candidatePassword) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }
            if (!isMatch) {
                return reject(err)
            }
            resolve(true)
        })
    })
}
module.exports = mongoose.model('User', User);
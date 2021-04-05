var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cart = require('./Cart.js').schema;
var Notification = require('./Notification.js').schema;


var User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    PaymentAddress: {
        type: String,
        default: ''
    },
    role: {
        type: Number,
        required: true,
        default: 0   //0 For Customer, 1 for Retailer, 2 for Wholesalers, -1 for Admin 
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    facebookId: String,
    googleId: String,
    Notifications: [Notification],
    FeedbacksGiven: [{ Feedback: mongoose.Schema.ObjectId }],
    FeedbacksReceived: [{ Feedback: mongoose.Schema.ObjectId }]
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

var Customer = new Schema({
    User: User,
    Cart: Cart
});
var Retailer = new Schema({
    User: User,
    Cart: Cart
})
var Wholesaler = new Schema({
    User: User,
})

module.exports = mongoose.model('Customer', Customer);
module.exports = mongoose.model('Retailer', Retailer);
module.exports = mongoose.model('Wholesaler', Wholesaler);
var express = require('express');
var router = express.Router();
var User = require('../Models/User');
var Orders = require('../Models/Order');

var passport = require('passport');
var authenticate = require('../Controller/authenticate');
var cors = require('./cors');
const config = require('../config');
const { token } = require('morgan');

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
router.get('/', function (req, res, next) {
    Orders.find({Customer:(mongoose.Schema.ObjectId)(req.user._id)}).then(orders => {
        res.send(orders);
    });
});

module.exports = router;
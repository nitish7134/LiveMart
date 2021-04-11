var express = require('express');
var router = express.Router();
var User = require('../Models/User');
var Items = require('../Models/Item');

var authenticate = require('../Controller/authenticate');
var cors = require('./cors');
var mongoose = require('mongoose');

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
    var num = req.user.role == 'Customer' ? 0 : 1
    Item.find({ Seller: num }).then(items => {
        res.send(items);
    });
});
router.get('/ToAdd', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
    var num = req.user.role == 'Retailer' ? 0 : 1
    try {
        Item.find({ Seller: num }).then(items => {
            res.send(items);
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.post('/', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    try {
        var seller = {
            Name: req.user.Name,
            Price: req.body.item.price,
            Quantity: req.body.item.Quantity,
            Seller: (mongoose.Types.ObjectId)(req.user._id),
        }
        Item.create({
            TotalQuantity: req.body.item.Quantity,
            Name: req.body.item.Name,
            Seller: (req.user.role == 'Retailer' ? 0 : 1),
            Category: req.body.item.Category,
        }).then(item => {
            item.Sellers.push(seller);
            item.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: "Item Created" });

        });
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
})

router.post('/:ItemID', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    try {
        Item.findById(req.params.ItemID).then(item => {
            if ((req.user.role == 'Retailer' ? 0 : 1) == item.seller)
                return res.statusCode(401);
            var seller = {
                Price: Number(req.body.item.price),
                Quantity: Number(req.body.item.Quantity),
                Name: req.user.Name,
                Seller: (mongoose.Schema.ObjectId)(req.user._id),
            }
            item.Sellers.push(seller);
            item.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: "Item Created" });
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
})

module.exports = router;
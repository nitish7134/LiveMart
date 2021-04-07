var express = require('express');
var router = express.Router();
var User = require('../Models/User');
var Item = require('../Models/Item');

var authenticate = require('../Controller/authenticate');
var cors = require('./cors');
const config = require('../config');



router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
    var num = req.user.role == 'Customer' ? 0 : 1
    Item.find({ Seller: num }).then(users => {
        res.send(users);
    });
});
router.get('/ToAdd', cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
    var num = req.user.role == 'Retailer' ? 0 : 1
    Item.find({ Seller: num }).then(users => {
        res.send(users);
    });
});

router.post('/', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    try {
        var seller = {
            Price: req.body.item.price,
            Quantity: req.body.item.Quantity,
            Name: req.user.Name,
            Seller: req.user._id,
        }
        const item = new Item({
            TotalQuantity: req.body.item.Quantity,
            Name: req.body.item.Name,
            Seler: req.user.role == 'Retailer' ? 0 : 1,
            Category: req.body.item.Category,
        });
        item.Sellers = [];
        item.Sellers.push(seller);
        await item.save();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: "Item Created" });
    } catch (err) {
        console.log(err);
        return res.status(401);
    }
})

router.post('/:ItemID', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    try {
        Item.findById(req.params.ItemID).then(item => {
            if ((req.user.role == 'Retailer' ? 0 : 1) == item.seller)
                return res.statusCode(401);
            var seller = {
                Price: req.body.item.price,
                Quantity: req.body.item.Quantity,
                Name: req.user.Name,
                Seller: req.user._id,
            }
            item.Sellers.push(seller);
            await item.save();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ message: "Item Created" });

        })
    } catch (err) {
        console.log(err);
        return res.status(401);
    }
})
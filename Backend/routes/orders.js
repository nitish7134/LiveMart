var express = require("express");
var router = express.Router();
var User = require("../Models/User");
var cors = require("./cors");
const mongoose = require("mongoose");
const CustomerOrders = require("../Models/CustomerOrders");
const SellerOrders = require("../Models/SellerOrders");
var authenticate = require("../Controller/authenticate");
const Cart = require("../Models/Cart");

router.use(express.json());
router.use(
	express.urlencoded({
		extended: true,
	})
);

router.options("*", cors.corsWithOptions, (req, res) => {
	res.sendStatus(200);
});
router.get(
	"/",
	cors.corsWithOptions,
	authenticate.verifyUser,
	function (req, res, next) {
		CustomerOrders.find({ Customer: mongoose.Schema.ObjectId(req.user._id) }).then(
			(orders) => {
				res.send(orders);
			}
		);
	}
);
router.get(
	"/seller",
	cors.corsWithOptions,
	authenticate.verifyUser,
	function (req, res, next) {
		SellerOrders.find({ Seller: mongoose.Schema.ObjectId(req.user._id) }).then(
			(orders) => {
				res.send(orders);
			}
		);
	}
);
router.post("/",
	cors.corsWithOptions,
	authenticate.verifyUser, async (req, res, next) => {
		var sellerOrders = {};
		/* console.log("***********")
		console.log(JSON.stringify(req.body));
		console.log("***********") */

		var Items = [];
		for (var i = 0; i < req.body.orderItems.Items.length; i++) {
			for (var j = 0; j < req.body.orderItems.Items[i].Sellers.length; j++) {
				delete req.body.orderItems.Items[i].Sellers[j]._id
				if (sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller]) {
					sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller].Items.push({

						item: req.body.orderItems.Items[i]._id,
						QuantityBought: req.body.orderItems.Items[i].Sellers[j].Quantity_to_buy

					})
				} else
					sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller] = {
						Seller: req.body.orderItems.Items[i].Sellers[j].Seller,
						Customer: req.body._id,
						orderType: req.body.OrderType,
						Address: {
							shippingAddress1: req.body.shippingAddress1,
							shippingAddress2: req.body.shippingAddress2,
							city: req.body.city,
							zip: req.body.city,
							country: req.body.country,
						},
						phoneNo: req.body.phone,
						Items: [{
							item: req.body.orderItems.Items[i]._id,
							QuantityBought: req.body.orderItems.Items[i].Sellers[j].Quantity_to_buy
						}],
					};
			}
			var item = {
				Item: req.body.orderItems.Items[i]._id,
				Sellers: req.body.orderItems.Items[i].Sellers
			}
			Items.push(item);
		}
		CustomerOrders.create({
			Customer: req.user._id,
			Order: {
				TotalPrice: req.body.orderItems.TotalPrice,
				Items: Items,
				statusCode: 0,
				orderType: req.body.orderType, //0 for online 1 for offline
				Address: {
					shippingAddress1: req.body.shippingAddress1,
					shippingAddress2: req.body.shippingAddress2,
					city: req.body.city,
					zip: req.body.zip,
					country: req.body.country,
				},
				phone: req.body.phone
			}
		}).then((customerOrder) => {
			Cart.findByIdAndDelete(req.user._id);
			// console.log("CREATED");
			if (customerOrder) {
				// console.log("CREATED",sellerOrders);
				Object.keys(sellerOrders).forEach(key => {
					console.log(sellerOrders[key] + " : " + key);
					console.log(JSON.stringify(sellerOrders[key]))
					SellerOrders.create(sellerOrders[key]).then(order => {
						console.log("CREATED " + order);
					}).catch(err => next(err))
				});
				return res.sendStatus(200);

			}
		}).catch((err) => {
			next(err);
		});
	})

module.exports = router;

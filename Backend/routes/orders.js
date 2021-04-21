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
		CustomerOrders.find({ Customer: req.user._id }).populate({ path: "Order", populate: { path: "Items", populate: { path: "Item", model: 'Items' } } }).then(
			(orders) => {
				console.log(orders);
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
		SellerOrders.find({ Seller: req.user._id }).populate({ path: "Items", populate: { path: "Item", model: 'Items' } }).then(
			(orders) => {
				console.log(JSON.stringify(orders));
				res.send(orders);
			}
		);
	}
);
router.post("/",
	cors.corsWithOptions,
	authenticate.verifyUser, async (req, res, next) => {
		console.log(JSON.stringify(req.body.orderItems))
		var sellerOrders = {};

		var Items = [];
		for (var i = 0; i < req.body.orderItems.Items.length; i++) {
			for (var j = 0; j < req.body.orderItems.Items[i].Sellers.length; j++) {
				delete req.body.orderItems.Items[i].Sellers[j]._id
				if (sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller]) {
					if (sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller].TotalPrice == undefined)
						sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller].TotalPrice = 0;

					// console.error("\n\nError Before " + i + " : " + j, sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller].TotalPrice);

					sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller].TotalPrice += (Number)(req.body.orderItems.Items[i].Sellers[j].Quantity_to_buy) * req.body.orderItems.Items[i].Sellers[j].Price
					// console.error("\n\nError After " + i + " : " + j, sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller].TotalPrice);
					sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller].Items.push({
						Item: req.body.orderItems.Items[i].Item.id,
						Price:req.body.orderItems.Items[i].Sellers[j].Price,
						QuantityBought: req.body.orderItems.Items[i].Sellers[j].Quantity_to_buy
					})
				}
				else {
					sellerOrders[req.body.orderItems.Items[i].Sellers[j].Seller] = {
						Seller: req.body.orderItems.Items[i].Sellers[j].Seller,
						Customer: req.body._id,
						orderType: req.body.OrderType,
						Address: req.body.address,
						phoneNo: req.body.phone,
						TotalPrice: req.body.orderItems.Items[i].Sellers[j].Quantity_to_buy * req.body.orderItems.Items[i].Sellers[j].Price,
						Items: [{
							Item: req.body.orderItems.Items[i].Item.id,
							Price:req.body.orderItems.Items[i].Sellers[j].Price,
							QuantityBought: req.body.orderItems.Items[i].Sellers[j].Quantity_to_buy
						}],
					};
				}
			}
			console.log("seller Orders", JSON.stringify(sellerOrders));
			var item = {
				Item: req.body.orderItems.Items[i].Item.id,
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
				Address: req.body.address,
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
					sellerOrders[key].orderID = customerOrder._id
					SellerOrders.create(sellerOrders[key]).then(order => {
						console.log("CREATED " + order);
					}).catch(err => next(err))
				});
				Cart.findOneAndDelete({ CustomerID: req.user._id }).then(() => {
					return res.sendStatus(200);

				}, err => next(err)).catch(err => next(err))

			}
		}).catch((err) => {
			next(err);
		});
	})

module.exports = router;

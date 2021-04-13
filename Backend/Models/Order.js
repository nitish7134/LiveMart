var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Cart = require("./Cart").schema;

var Order = new Schema({
  Cart: Cart,
  SellerRole: Number,
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  statusCode: Number,
  Address: String,
  ExpectedDelivery: Date,
});

Order.virtual("id").get(function () {
  return this._id.toHexString();
});

Order.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Order", Order);

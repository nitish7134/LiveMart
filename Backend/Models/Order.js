var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Order = new Schema({
  user: mongoose.Schema.ObjectId,
  TotalPrice: Number,
  Items: [{
    Item: mongoose.Schema.ObjectId,
    Sellers: [{
      Seller: mongoose.Schema.ObjectId,
      Quantity_to_buy: Number
    }]
  }],
  CustomerRole: Number,
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  statusCode: Number,
  Address: String,
  ExpectedDelivery: Date,
  phone: String
});

Order.virtual("id").get(function () {
  return this._id.toHexString();
});

Order.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Order", Order);

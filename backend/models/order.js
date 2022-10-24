const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  orderno: Number,
  userid: String,
  datetime: String,
  storeaddress: String,
  location: String,
  district: String,
  phone: String,
  items: Number,
  storename: String,
  status: String,
  price: Number,
  orderdetails: Object,
});

const order = mongoose.model("order", orderSchema);

module.exports = order;

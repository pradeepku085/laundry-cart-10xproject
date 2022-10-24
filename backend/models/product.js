const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product: String,
  description: String,
  image: String,
  washing: Number,
  ironing: Number,
  drying: Number,
  chemical: Number,
});

const product = mongoose.model("product", productSchema);

module.exports = product;

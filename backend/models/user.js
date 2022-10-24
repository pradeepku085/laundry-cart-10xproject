const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  address: Array,
  pincode: String,
  district: String,
  refreshToken: String,
  type: String,
  state: String,
});

const user = mongoose.model("user", userSchema);

module.exports = user;

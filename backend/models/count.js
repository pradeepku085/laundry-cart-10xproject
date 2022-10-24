const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
  id: Number,
  count: Number,
});

const counter = mongoose.model("counter", countSchema);

module.exports = counter;

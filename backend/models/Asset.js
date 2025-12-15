const mongoose = require("mongoose");

module.exports = mongoose.model("Asset", new mongoose.Schema({
  name: String,
  type: String,
  unit: String
}));

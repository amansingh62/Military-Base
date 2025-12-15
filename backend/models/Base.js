const mongoose = require("mongoose");

module.exports = mongoose.model("Base", new mongoose.Schema({
  name: String,
  location: String
}));

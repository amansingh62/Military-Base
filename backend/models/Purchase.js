const mongoose = require("mongoose");

module.exports = mongoose.model("Purchase", new mongoose.Schema({
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  baseId: { type: mongoose.Schema.Types.ObjectId, ref: "Base" },
  quantity: Number,
  date: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}));

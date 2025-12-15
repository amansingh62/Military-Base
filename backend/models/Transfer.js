const mongoose = require("mongoose");

module.exports = mongoose.model("Transfer", new mongoose.Schema({
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  fromBase: { type: mongoose.Schema.Types.ObjectId, ref: "Base" },
  toBase: { type: mongoose.Schema.Types.ObjectId, ref: "Base" },
  quantity: Number,
  date: Date,
  status: { type: String, default: "COMPLETED" }
}));

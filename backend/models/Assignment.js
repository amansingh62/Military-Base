const mongoose = require("mongoose");

module.exports = mongoose.model("Assignment", new mongoose.Schema({
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" },
  baseId: { type: mongoose.Schema.Types.ObjectId, ref: "Base" },
  assignedTo: String,
  quantity: Number,
  type: { type: String, enum: ["ASSIGNED", "EXPENDED"] },
  date: Date
}));

const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    unit: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Asset", assetSchema);

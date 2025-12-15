const mongoose = require("mongoose");

module.exports = mongoose.model("AuditLog", new mongoose.Schema({
  action: String,
  entity: String,
  payload: Object,
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now }
}));

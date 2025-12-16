const Transfer = require("../models/Transfer");

exports.createTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.create({
      ...req.body,
      date: new Date(),
      status: "COMPLETED"
    });
    const populatedTransfer = await Transfer.findById(transfer._id).populate("assetId fromBase toBase");
    res.status(201).json(populatedTransfer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.find()
      .populate("assetId fromBase toBase")
      .sort({ date: -1 }); 
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Transfer = require("../models/Transfer");

exports.createTransfer = async (req, res) => {
  const transfer = await Transfer.create({
    ...req.body,
    date: new Date(),
    status: "COMPLETED"
  });
  res.status(201).json(transfer);
};

exports.getTransfers = async (req, res) => {
  res.json(
    await Transfer.find()
      .populate("assetId fromBase toBase")
  );
};

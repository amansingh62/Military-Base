const Purchase = require("../models/Purchase");

exports.createPurchase = async (req, res) => {
  const purchase = await Purchase.create({
    ...req.body,
    createdBy: req.user.id,
    date: new Date()
  });
  res.status(201).json(purchase);
};

exports.getPurchases = async (req, res) => {
  const { baseId, assetId, from, to } = req.query;

  const filter = {};
  if (baseId) filter.baseId = baseId;
  if (assetId) filter.assetId = assetId;
  if (from && to) filter.date = { $gte: from, $lte: to };

  res.json(await Purchase.find(filter).populate("assetId baseId"));
};

const Purchase = require("../models/Purchase");

exports.createPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.create({
      ...req.body,
      createdBy: req.user.id,
      date: new Date()
    });
    const populatedPurchase = await Purchase.findById(purchase._id).populate("assetId baseId");
    res.status(201).json(populatedPurchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPurchases = async (req, res) => {
  try {
    const { baseId, assetId, from, to } = req.query;

    const filter = {};
    if (baseId) filter.baseId = baseId;
    if (assetId) filter.assetId = assetId;
    if (from && to) filter.date = { $gte: from, $lte: to };

    const purchases = await Purchase.find(filter)
      .populate("assetId baseId")
      .sort({ date: -1 }); // Most recent first
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

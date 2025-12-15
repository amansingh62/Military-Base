const Purchase = require("../models/Purchase");
const Transfer = require("../models/Transfer");
const Assignment = require("../models/Assignment");
const { sumQty } = require("../utils/balanceUtil");

exports.getDashboard = async (req, res) => {
  const purchases = await Purchase.find();
  const transfersIn = await Transfer.find({ toBase: req.user.baseId });
  const transfersOut = await Transfer.find({ fromBase: req.user.baseId });
  const assigned = await Assignment.find({ type: "ASSIGNED" });
  const expended = await Assignment.find({ type: "EXPENDED" });

  const openingBalance = 0;
  const netMovement =
    sumQty(purchases) +
    sumQty(transfersIn) -
    sumQty(transfersOut);

  const closingBalance =
    openingBalance +
    netMovement -
    sumQty(expended);

  res.json({
    openingBalance,
    netMovement,
    closingBalance,
    assigned: sumQty(assigned),
    expended: sumQty(expended)
  });
};

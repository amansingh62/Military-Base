exports.sumQty = (arr) =>
  arr.reduce((sum, r) => sum + r.quantity, 0);

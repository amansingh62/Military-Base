const AuditLog = require("../models/AuditLog");

module.exports = async (req, res, next) => {
  res.on("finish", async () => {
    if (["POST", "PUT"].includes(req.method)) {
      await AuditLog.create({
        action: req.method,
        entity: req.originalUrl,
        payload: req.body,
        performedBy: req.user?.id
      });
    }
  });
  next();
};

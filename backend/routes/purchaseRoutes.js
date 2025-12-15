const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const rbac = require("../middleware/rbacMiddleware");
const audit = require("../middleware/auditMiddleware");
const ctrl = require("../controllers/purchaseController");

router.post("/", auth, rbac("ADMIN", "LOGISTICS"), audit, ctrl.createPurchase);
router.get("/", auth, rbac("ADMIN", "COMMANDER", "LOGISTICS"), ctrl.getPurchases);

module.exports = router;

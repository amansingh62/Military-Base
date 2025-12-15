const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const rbac = require("../middleware/rbacMiddleware");
const audit = require("../middleware/auditMiddleware");
const ctrl = require("../controllers/transferController");

router.post("/", auth, rbac("ADMIN", "LOGISTICS"), audit, ctrl.createTransfer);
router.get("/", auth, rbac("ADMIN", "COMMANDER", "LOGISTICS"), ctrl.getTransfers);

module.exports = router;

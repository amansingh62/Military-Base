const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const rbac = require("../middleware/rbacMiddleware");
const ctrl = require("../controllers/dashboardController");

router.get("/", auth, rbac("ADMIN", "COMMANDER"), ctrl.getDashboard);

module.exports = router;

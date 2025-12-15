const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const rbac = require("../middleware/rbacMiddleware");
const audit = require("../middleware/auditMiddleware");
const ctrl = require("../controllers/assignmentController");

router.post("/", auth, rbac("ADMIN", "COMMANDER"), audit, ctrl.createAssignment);
router.get("/", auth, rbac("ADMIN", "COMMANDER"), ctrl.getAssignments);

module.exports = router;

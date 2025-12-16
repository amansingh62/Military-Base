const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const rbac = require("../middleware/rbacMiddleware");
const ctrl = require("../controllers/authController");


router.post(
  "/register",
  auth,
  rbac("ADMIN"),
  ctrl.register
);

router.post("/login", ctrl.login);

module.exports = router;

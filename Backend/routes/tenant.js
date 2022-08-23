const router = require("express").Router();
const tenant_controller = require("../controllers/tenant_controller");

router.get("/all",tenant_controller.getAllTenants);
router.get("/checkedin/all",tenant_controller.getTenantsCheckedIn);
router.put("/checkedin",tenant_controller.checkedin);
router.put("/checkedout",tenant_controller.checkedout);

module.exports = router;
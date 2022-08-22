const router = require("express").Router();
const tenant_controller = require("../controllers/tenant_controller");

router.get("/all",tenant_controller.getAllTenants);

module.exports = router;
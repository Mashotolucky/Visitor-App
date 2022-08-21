const router = require("express").Router();

const admin_controller = require('../controllers/admin_controller');

router.post("/visitor/add", admin_controller.addVisitor);

module.exports = router;
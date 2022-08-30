const router = require("express").Router();

const admin_controller = require('../controllers/admin_controller');

router.post("/visitor/add", admin_controller.addVisitor);
router.get("/visitor/checkedin", admin_controller.getALLCheckedInVisitor);
router.put("/visitor/checkout", admin_controller.checkedoutVisitor);

module.exports = router;
const router = require("express").Router();

const { auth } = require("googleapis/build/src/apis/accesscontextmanager");
const auth_controller = require("../controllers/auth_controller");

router.post("/login", auth_controller.login);
router.post("/register", auth_controller.register);

module.exports = router;

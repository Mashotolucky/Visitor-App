const router = require("express").Router();
const auth = require("./auth");
const admin = require("./admin");



router.use("/auth",auth);
router.use("/admin",admin);

module.exports = router;
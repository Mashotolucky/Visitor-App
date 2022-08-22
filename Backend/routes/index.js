const router = require("express").Router();
const auth = require("./auth");
const admin = require("./admin");
const tenant = require("./tenant");


router.use("/auth",auth);
router.use("/admin",admin);
router.use("/tenant",tenant);

module.exports = router;
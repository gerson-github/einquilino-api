
const express = require("express");
const router = express.Router();
const controller = require("./indicator.controller");

router.get("/monthly", controller.getMonthly);

module.exports = router;

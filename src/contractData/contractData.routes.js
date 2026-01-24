// src/contractData/contractData.routes.js
const express = require("express");
const router = express.Router();
const controller = require("./contractData.controller");

router.post("/", controller.saveContractData);

module.exports = router;

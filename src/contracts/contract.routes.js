// src/templates/template.routes.js
const express = require("express");
const router = express.Router();
const controller = require("./contract.controller");

router.get("/", controller.getAllContracts);
router.get("/:id", controller.getContractById);

module.exports = router;

// src/templates/template.routes.js
const express = require("express");
const router = express.Router();
const controller = require("./template.controller");

router.get("/", controller.getAllTemplates);
router.get("/:id", controller.getTemplateById);

module.exports = router;

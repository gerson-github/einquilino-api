// src/templates/template.controller.js
const service = require("./template.service");

exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await service.getAllTemplates();
    res.json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch templates" });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await service.getTemplateById(id);

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    res.json(template);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch template" });
  }
};

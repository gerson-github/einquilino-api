 // src/templates/template.service.js
const repository = require("./template.repository");

exports.getAllTemplates = async () => {
  return repository.findAll();
};

exports.getTemplateById = async (id) => {
  // aqui você pode validar UUID, permissões, etc
  return repository.findById(id);
};

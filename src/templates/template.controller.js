// Um controller é a camada que fica entre as rotas HTTP e a lógica de negócio.
// Ele não deve saber nada sobre SQL ou DB diretamente — só trata:
// Receber a requisição (req)
// Chamar a camada de serviço (service)
// Tratar erros
// Retornar resposta (res) para o cliente

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

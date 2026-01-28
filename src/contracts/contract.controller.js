// Um controller é a camada que fica entre as rotas HTTP e a lógica de negócio.
// Ele não deve saber nada sobre SQL ou DB diretamente — só trata:
// Receber a requisição (req)
// Chamar a camada de serviço (service)
// Tratar erros
// Retornar resposta (res) para o cliente

const service = require("./contract.service");

exports.getAllContracts = async (req, res) => {
  try {
    const Contracts = await service.getAllContracts();
    res.json(Contracts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Contracts" });
  }
};

exports.getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const Contract = await service.getContractById(id);

    if (!Contract) {
      return res.status(404).json({ error: "Contract not found" });
    }

    res.json(Contract);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Contract" });
  }
};

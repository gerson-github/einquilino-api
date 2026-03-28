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

/*--- CRUD operations ---*/
exports.createContract = async (req, res) => {
  try {
    const contractData = req.body;
    const newContract = await service.createContract(contractData);
    res.status(201).json(newContract);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Contract" });
  }
};
exports.updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contractData = req.body;
    console.log(contractData);
    const updatedContract = await service.updateContract(id, contractData);

    if (!updatedContract) {
      return res.status(404).json({ error: "Contract not found" });
    }

    res.json(updatedContract);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update Contract" });
  }
};
exports.deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteContract(id);
    if (!deleted) {
      return res.status(404).json({ error: "Contract not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete Contract" });
  }
};
/*--- End of CRUD operations ---*/

 // src/Contracts/Contract.service.js
const repository = require("./contract.repository");

exports.getAllContracts = async () => {
  return repository.findAll();
};

exports.getContractById = async (id) => {
  // aqui você pode validar UUID, permissões, etc
  return repository.findById(id);
};

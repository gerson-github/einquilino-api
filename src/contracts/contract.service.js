// src/contracts/contract.service.js
const repository = require("./contract.repository");

exports.getAllContracts = async () => {
  return repository.findAll();
};

exports.getContractById = async (id) => {
  return repository.findById(id);
};

exports.createContract = async (contractData) => {
  // validações e lógica de negócio aqui
  return repository.create(contractData);
};

exports.updateContract = async (id, contractData) => {
  const existingContract = await repository.findById(id);
  if (!existingContract) {
    return null;
  }
  return repository.update(id, contractData);
};

exports.deleteContract = async (id) => {
  const existingContract = await repository.findById(id);
  if (!existingContract) {
    return null;
  }
  return repository.delete(id);
};

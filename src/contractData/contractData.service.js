// src/contractData/contractData.service.js
const repository = require("./contractData.repository");

exports.saveContractData = async (jsonData) => {
  if (!jsonData.contractId) {
    throw new Error("contractId is required");
  }

  return repository.saveContractData(jsonData);
};

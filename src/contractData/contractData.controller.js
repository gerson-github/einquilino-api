// src/contractData/contractData.controller.js
const service = require("./contractData.service");

exports.saveContractData = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    //await service.saveContractData(req.body);
    return res.status(200).json({ message: "Contract data saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message || "Failed to save contract data"
    });
  }
};

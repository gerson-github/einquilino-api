// src/contractData/contractData.repository.js
const db = require("../db");

exports.saveContractData = async (jsonData) => {
  
  //const sql = `CALL rentals_db.save_contract_data($1)`;
  //await db.query(sql, [jsonData]);

   return { success: true };
};

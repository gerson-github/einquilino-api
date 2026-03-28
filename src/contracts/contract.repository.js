// src/contracts/contract.repository.js
const db = require("../db");

exports.findAll = async () => {
  const sql = `
    SELECT id, templateName
    FROM rentals_db.templates
    ORDER BY createdAt DESC
  `;
  const { rows } = await db.query(sql);
  return rows;
};

exports.findById = async (id) => {
  const sql = `
    SELECT rentals_db.get_contract_by_id($1) AS contract
  `;
  const { rows } = await db.query(sql, [id]);
  return rows[0]?.contract || null;
};

exports.create = async (contractData) => {
  const sql = `
    INSERT INTO rentals_db.contracts (name, details)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [contractData.name, contractData.details];
  const { rows } = await db.query(sql, values);
  return rows[0];
};

exports.update = async (id, contractData) => {
  try {
    console.log("Updating contract with data:", contractData);
    console.log("Using ID:", id);

    // Call the stored procedure
    if (contractData.data) {
      const sql = `CALL rentals_db.upsert_contract_from_json($1::uuid, $2::jsonb)`;
      const values = [id, JSON.stringify(contractData.data)];
      await db.query(sql, values);
    }

    //return the updated contract
    const updatedContract = await this.findById(id);
    if (!updatedContract) {
      return null;
    }

    //return { success: true, id: updatedContract.id, version: contractData.version || null, submittedAt: contractData.submittedAt || null, data: updatedContract.data };
    return { success: true };
  } catch (err) {
    console.error("Error updating contract:", err);
    throw err;
  }
};

exports.delete = async (id) => {
  const sql = `
    DELETE FROM rentals_db.contracts
    WHERE id = $1
    RETURNING *
  `;
  const { rows } = await db.query(sql, [id]);
  return rows[0] || null;
};



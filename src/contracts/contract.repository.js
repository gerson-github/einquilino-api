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

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
  const sql = `
    UPDATE rentals_db.contracts
    SET name = $1,
        details = $2,
        updatedAt = NOW()
    WHERE id = $3
    RETURNING *
  `;
  const values = [contractData.name, contractData.details, id];
  const { rows } = await db.query(sql, values);
  return rows[0] || null;
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

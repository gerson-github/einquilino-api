// file.repository.js
const db = require("../db");

exports.insertFile = async ({ contractId, fileName, mimeType, filePath }) => {
  const result = await db.query(
    `INSERT INTO rentals_db.contract_files
     (contract_id, file_name, mime_type, file_path)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [contractId, fileName, mimeType, filePath]
  );

  return result.rows[0];
};

exports.getFileById = async (id) => {
  const result = await db.query(
    `SELECT * FROM rentals_db.contract_files WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

exports.deleteFile = async (id) => {
  await db.query(
    `DELETE FROM rentals_db.contract_files WHERE id = $1`,
    [id]
  );
};

// file.repository.js
exports.getFilesByContractId = async (contractId) => {
  const result = await db.query(
    `SELECT id, file_name, mime_type, file_path
     FROM rentals_db.contract_files
     WHERE contract_id = $1
     ORDER BY id DESC`,
    [contractId]
  );

  return result.rows;
};

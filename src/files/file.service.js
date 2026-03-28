// file.service.js
const fs = require("fs");
const path = require("path");
const fileRepository = require("./file.repository");

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

exports.uploadFile = async (contractId, file) => {
  // 1. Create unique filename
  const fileName = `${Date.now()}-${file.originalname}`;
  const filePath = path.join(UPLOAD_DIR, fileName);

  // 2. Save file to disk
  fs.writeFileSync(filePath, file.buffer);

  // 3. Save reference in DB
  const result = await fileRepository.insertFile({
    contractId,
    fileName,
    mimeType: file.mimetype,
    filePath
  });

  return result.id;
};

exports.getFileById = async (id) => {
  const file = await fileRepository.getFileById(id);

  if (!file) throw new Error("File not found");

  return file;
};

exports.deleteFile = async (id) => {
  const file = await fileRepository.getFileById(id);

  if (!file) throw new Error("File not found");

  // delete from disk
  fs.unlinkSync(file.file_path);

  // delete from DB
  await fileRepository.deleteFile(id);
};

// file.service.js
exports.getFilesByContractId = async (contractId) => {
  return await fileRepository.getFilesByContractId(contractId);
};


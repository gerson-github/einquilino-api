const fileService = require("./file.service");

exports.uploadFile = async (req, res) => {
  try {
    const { contract_id } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedFile = await fileService.uploadFile(contract_id, file);
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await fileService.getFileById(req.params.id);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.download(file.file_path, file.file_name); // using the file path for download
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteFile = async (req, res) => {
  try {
    await fileService.deleteFile(req.params.id);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
};

exports.getFilesByContract = async (req, res) => {
  try {
    const { contractId } = req.params;

    const files = await fileService.getFilesByContractId(contractId);

    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

// const db = require("../db");

// //create
// exports.uploadFile = async (req, res) => {
//   try {
//     const { contract_id } = req.body;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const result = await db.query(
//       `SELECT * FROM rentals_db.insert_contract_file($1, $2, $3, $4)`,
//       [
//         contract_id,
//         file.originalname,
//         file.mimetype,
//         file.buffer
//       ]
//     );

//     res.json({
//       message: "File uploaded successfully",
//       fileId: result.rows[0].id   // depends on what the function returns
//     });

//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: "Failed to upload file" });
//   }
// };

// // DOWNLOAD file
// exports.downloadFile = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await db.query(
//       `SELECT file_name, mime_type, file_data
//        FROM rentals_db.contract_files
//        WHERE id = $1`,
//       [id]
//     );

//     const file = result.rows[0];

//     res.setHeader("Content-Type", file.mime_type);
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="${file.file_name}"`
//     );

//     res.send(file.file_data);

//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// // DELETE
// exports.deleteFile = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await db.query(
//       `DELETE FROM rentals_db.contract_files
//        WHERE id = $1`,
//       [id]
//     );

//     res.json({ message: "File deleted" });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

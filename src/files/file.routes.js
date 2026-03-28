const express = require("express");
const router = express.Router();

const controller = require("./file.controller");
const upload = require("./upload");

router.post("/upload", upload.single("file"), controller.uploadFile);

router.get("/list/:contractId", controller.getFilesByContract);

router.get("/download/:id", controller.downloadFile);

router.delete("/delete/:id", controller.deleteFile);

module.exports = router;

// Method          Endpoint                            Purpose
// POST            /api/contract-files/upload          upload file      http://localhost:3000/api/contract-files/upload  contract_id, file (form-data)
// GET             /api/contract-files/list/:id        list files       http://localhost:3000/api/contract-files/list/c1111111-1111-1111-1111-111111111111
// GET             /api/contract-files/download/:id    download file     http://localhost:3000/api/contract-files/download/8
// DELETE          /api/contract-files/delete/:id      delete file       http://localhost:3000/api/contract-files/delete/8

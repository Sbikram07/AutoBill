const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },

});


const { createBill, exportBill } = require("../controller/billing.controller");
const { detectProduct } = require("../controller/prediction.controller");
router.post("/create-bill", createBill);
router.get("/export-bill/:id", exportBill);
router.post("/detect-product", upload.single("file"), detectProduct);
module.exports = router;
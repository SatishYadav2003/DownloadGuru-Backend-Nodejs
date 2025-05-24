const express = require("express");
const router = express.Router();
const { downloadVideo } = require("../controllers/downloadController");

router.get("/download_video", downloadVideo);

module.exports = router;

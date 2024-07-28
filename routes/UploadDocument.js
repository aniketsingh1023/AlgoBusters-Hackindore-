const express = require("express");
const router = express.Router();

//import controller
const { uploadDocument } = require("../controllers/uploadDocument");

router.put("/uploadDocument", uploadDocument);

module.exports = router;
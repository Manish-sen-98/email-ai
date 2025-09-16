const express = require("express");
const { generateEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/generate", generateEmail);

module.exports = router;

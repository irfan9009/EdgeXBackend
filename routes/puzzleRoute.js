const express = require("express");
const router = express.Router();
const { checkAnswer } = require("../controllers/puzzleController");

router.post("/answer", checkAnswer);
module.exports = router;

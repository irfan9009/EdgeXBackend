const express = require("express");
const router = express.Router();
const { checkAnswer } = require("../controllers/puzzleController");
const { pointValidate } = require("../middlewares/pointvalidator");

router.post("/answer", pointValidate, checkAnswer);
module.exports = router;

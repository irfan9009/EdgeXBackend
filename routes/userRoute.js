const express = require("express");
const {
  userPost,
  userPut,
  userGetAll,
  userGetSpecific,
  userLogin,
} = require("../controllers/userController");
const router = express.Router();
router.post("/", userPost);
router.put("/", userPut);
router.get("/login", userLogin);
router.get("/", userGetAll);
router.get("/:id", userGetSpecific);

module.exports = router;

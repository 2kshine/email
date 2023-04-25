const express = require("express");
const router = express.Router();

const userController  = require("../src/controllers/userController");

router.post("/", userController.createUser);
router.post("/verify-email", userController.verifyToken);

module.exports = router;
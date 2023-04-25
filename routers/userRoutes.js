const express = require("express");
const router = express.Router();

const userController  = require("../src/controllers/userController");
//Register User
router.post("/register", userController.createUser);

//Verify email and store password
router.post("/verify-email", userController.verifyToken);

//Login user

//Two-factor authentication enable endpoint
router.post('/two-factor/enable/:id', userController.twoFactor)
//Two factor authentication disable endpoint


module.exports = router;
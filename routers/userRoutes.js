const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../src/middlewares/isAuthenticatedMiddleware");
const userController = require("../src/controllers/userController");
const isActive = require("../src/middlewares/sessActivityMiddleware");
//Register User
//create a logical if the send verification token gets expired. resend another one.
router.post("/register", userController.createUser);

//Verify email and store password
router.post("/verify-email", userController.verifyToken);

//Login user
router.post("/login", userController.loginUser);

//Logout user
router.post("/logout", userController.logoutUser);

//Two-factor authentication enable endpoint
router.post("/two-factor/enable", userController.twoFactorEnable);

//Two factor authentication verify endpoint
router.post("/two-factor/verify", userController.twoFactorVerify);

router.post("/protected", isAuthenticated, isActive, (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Protected route accessed.",
      user_id: req.session.user_id,
    })
});

module.exports = router;

const { User } = require("../../models");
const Validation = require("../validations/validation");
const ErrorCodes = require("../validations/errorCodes");
const SendEmailVerification = require("../services/sendEmailVerification");
const crypto = require("crypto");

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    //Validate Email address
    await Validation(User, email);
    //Create Token by hashing user_id
    const randomToken = generateToken();
    //Create User
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      active: true,
      verified: false,
      token: randomToken,
      token_expiry: new Date(Date.now() + 3600000),
    });
    SendEmailVerification(randomToken, user.id, email);
    res.status(201).json({
      status: "sucesss",
      message:
        "Successfully created user. An email has been sent to your account for verification purposes.",
      data: user,
    });
  } catch (err) {
    console.log("Error: " + err);
    const errorCodes = ErrorCodes(err.code);
    if (errorCodes) {
      res.status(errorCodes.status).json({
        status: "failed",
        message: errorCodes.message,
      });
    } else {
      res.status(500).json({
        status: "failed",
        message: "Internal Server Error.",
      });
    }
  }
};
const verifyToken = async (req, res) => {
  try {
    //find the user with id and token.
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid link",
      });
    }
    //Verify that the token matches and is not expired.
    if (user.token !== req.params.token || user.token_expiry < new Date()) {
      return res.status(403).json({
        message: "Invalid or expired token",
      });
    }
    //if the token does match clear the token and reset token fields.
    user.token = null;
    user.token_expiry = null;

  } catch (err) {
    res.status(500).json({
        status: "failed",
        message: "Internal Server Error.",
      });
  }
};
const generateToken = () => {
  const randomToken = crypto.randomBytes(64).toString("hex");
  return randomToken;
};

module.exports = { createUser,verifyToken };

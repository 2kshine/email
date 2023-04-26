const { User } = require("../../models");
const Validation = require("../validations/validation");
const ErrorCodes = require("../validations/errorCodes");
const SendEmailVerification = require("../services/sendEmailVerification");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const GenerateTotpSecret = require("../services/twoFactorAuth/generateTotpSecret");
const GenerateRecoveryCodes = require("../services/twoFactorAuth/generateRecoveryCode");
const createUser = async (req, res) => {
  const { first_name, last_name, email, password, confirmation_password } =
    req.body;
  try {
    //Validate Email address
    await Validation({ User, email });
    //Create Token by hashing user_id
    const randomToken = generateToken();
    //Create User
    const user = await User.create({
      first_name,
      last_name,
      email,
      active: true,
      verified: false,
      token: randomToken,
      token_expiry: new Date(Date.now() + 3600000),
    });
    await SendEmailVerification(user, randomToken);
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
    const { password, confirmation_password } = req.body;
    const { token } = req.query;
    console.log(req.query.token);
    //find the user with id and token.
    const user = await User.findOne({
      where: {
        token: token,
      },
    });

    //Verify that the token matches and is not expired.
    if (user.token_expiry < new Date()) {
      return res.status(403).json({
        message: "Invalid or expired token",
      });
    }
    await user.update({
      verified: true,
    });

    //if the token does match clear the token and reset token fields.
    // user.verified = true;
    // user.token = null;
    // user.token_expiry = null;
    //Create password and confirm password
    console.log(password);
    const validatePassword = await Validation({
      password,
      confirmation_password,
    });
    //encrypt password before storing it in database.
    const encryptPassword = await bcrypt.hash(password, 10);
    const encryptConfirmationPassword = await bcrypt.hash(password, 10);

    //Update the database with password and tokens.
    await user.update({
      password: encryptPassword,
      confirmation_password: encryptConfirmationPassword,
      token: null,
      token_expiry: null,
    });

    res.status(201).json({
      status: "sucesss",
      message: "Successfully created password and verified user.",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error.",
    });
  }
};
const twoFactor = async (req, res) => {
  try {
    //find user by id
    const user = await User.findByPk(req.params.id);
    //Two factor secret key.
    const secret_key = await GenerateTotpSecret(user);
    //Recovery codes
    const recovery_codes = GenerateRecoveryCodes();
    const { qrCode, secret } = secret_key;
    //update user with secret
    console.log(recovery_codes);
    //To convert string back to array use
    //JSON.parse(string)
    await user.update({
      two_factor_secret: secret,
      two_factor_created_at: new Date(),
      two_factor_recovery_code: recovery_codes
    });
    res.status(201).json({
      status: "sucesss",
      message: "Here is the qr code.",
      qrCode,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error.",
    });
  }
};

const generateToken = () => {
  const randomToken = crypto.randomBytes(32).toString("hex");
  return randomToken;
};

module.exports = { createUser, verifyToken, twoFactor };

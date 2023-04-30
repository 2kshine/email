const { User } = require("../../models");
const Validation = require("../validations/validation");
const ErrorCodes = require("../validations/errorCodes");
const SendEmailVerification = require("../services/sendEmailVerification");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const GenerateTotpSecret = require("../services/twoFactorAuth/generateTotpSecret");
const VerifyTotpSecret = require("../services/twoFactorAuth/verifyTotpSecret")
const passport = require("passport");
const createUser = async (req, res) => {
  const { first_name, last_name, email} =
    req.body;
  try {
    //Validate Email address
    await Validation({ User, email });
    //Create Token by hashing user_id
    const randomToken = generateToken();
    await SendEmailVerification(email, randomToken);
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
    //find the user with id and token.
    let user = await User.findOne({
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
    const validatePassword = await Validation({
      password,
      confirmation_password,
    });
    //encrypt password before storing it in database.
    const encryptPassword = await bcrypt.hash(password, 10);
    const encryptConfirmationPassword = await bcrypt.hash(password, 10);

    //Update the database with password and tokens.
    user = await user.update({
      password: encryptPassword,
      confirmation_password: encryptConfirmationPassword,
    });
    // setup session for user.
    req.session.user_id = user.id;
    if (user) {
      res.status(201).json({
        status: "success",
        message: "Success in verifying user.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error.",
    });
  }
};
const twoFactorEnable = async (req, res) => {
  try {
    //find user by id from session.
    const user = await User.findByPk(req.session.user_id);
    //Two factor secret key.
    const secret_key = await GenerateTotpSecret(user);
    
    const { qrCode, secret } = secret_key;
    //update user with secret
    await user.update({
      two_factor_secret: secret,
      two_factor_created_at: new Date()
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

const twoFactorVerify = async (req, res) => {
  try{
    //Destructure the req body.
    const { code } = req.body
    //check if two factor is enabled.
    const user = await User.findByPk(req.session.user_id);
    if(!user){
      const error = new Error("Cannot find user.");
      error.code = "USR_NT_FOUND";
      throw error;
    }
    console.log(user.two_factor_secret)
    if(user.two_factor_secret === null){
      const error = new Error("Enable two fa auth.");
      error.code = "ENB_TWOFA";
      throw error;
    }
    if(code === ""){
      const error = new Error("Code cannot be empty");
      error.code = "CODE_EMPTY";
      throw error;
    }
    const verifyCode = await VerifyTotpSecret(code, user.two_factor_secret, user);
    if(!verifyCode){
      const error = new Error("Cannot find user.");
      error.code = "USR_NT_FOUND";
      throw error;
      
    }
    res.status(201).json({
      status: "success",
      message: "Two factor verified successfully.",
    });
  }catch(err){
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
const loginUser = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ status: "failed", message: err.message });
    }
    if (!user) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid email or password" });
    }
    //To established login.
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: err.message,
        });
      }
      // setup session for user.
      req.session.user_id = user.id;
      return res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.first_name,
          email: user.email,
        },
      });
    });
  })(req, res, next);
};

const logoutUser = async (req, res) => {
  try {
    await req.logout((err) => {
      if (err) {
        res.status(500).send({
          status: "Failed",
          message: "Failed to logout",
        });
      }
    });
    await req.session.destroy;
    res.status(200).json({
      status: "success",
      message: "You are logged out.",
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

module.exports = {
  createUser,
  verifyToken,
  loginUser,
  logoutUser,
  twoFactorVerify,
  twoFactorEnable,
};

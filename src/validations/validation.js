//Dummy data
const domain = [
  "upstreamtech",
  "athlead",
  "performancetravel",
  "operation",

];
const zxcvn = require("zxcvbn");

const Validation = async ({User, email, password, confirmation_password}) => {
  //Format Validation
  if (User) {
    if (!(await checkAvailablity(User, email))) {
      const error = new Error("Email id is already registered.");
      error.code = "EMAIL_DUP_ENTRY";
      throw error;
    }
  }
  if (email) {
    if (!checkFormat(email)) {
      const error = new Error("Invalid email format");
      error.code = "INV_EMAIL";
      throw error;
    }
    if (!checkDomain(email)) {
      const error = new Error("Invalid domain name");
      error.code = "INV_DOMAIN";
      throw error;
    }
  }
  if (password) {
    if (!checkPasswordValidity(password)) {
      const error = new Error("Invalid password complexity");
      error.code = "INV_PASS_COMP";
      throw error;
    }
    if (!checkPasswordStrength(password)) {
      const error = new Error("Password is too common to guess.");
      error.code = "INV_PASS_STR";
      throw error;
    }
  }
  if(confirmation_password){
    if(password !== confirmation_password){
      const error = new Error("Passwords mismatch");
        error.code = "INV_PASS_CONFIRM";
        throw error;
    }
  }
  
};

const checkFormat = (userEmail) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(userEmail)) {
    return true;
  }
  return false;
};
const checkDomain = (userEmail) => {
  //Split email into 2 parts. (1st@2nd)
  let parts = userEmail.split("@");
  //Split 2nd part into two parts. (1st.2nd)
  let userDomain = parts[1].split(".");
  if (userDomain[1] === "io" || userDomain[1] === "com") {
    for (let i = 0; i < domain.length; i++) {
      if (userDomain[0] === domain[i]) {
        return true;
      }
    }
  }
  return false;
};

const checkAvailablity = async (User, userEmail) => {
  //Find the email in database and return false if matches.
  const user = await User.findOne({ where: { email: userEmail } });
  if (user) {
    return false;
  }
  return true;
};

const checkPasswordValidity = (password) => {
  // Minimum 8 characters, at least 1 special character, and 1 number
  const passwordRegex =
    /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  if (!passwordRegex.test(password)) {
    console.log("executed")
    return false;
  }
  return true
};
const checkPasswordStrength = (password) => {
  //Check password is not a common word/phrase.
  const strength = zxcvn(password).score;

  if (strength < 3) {
    return false;
  }
  return true
};
module.exports = Validation;

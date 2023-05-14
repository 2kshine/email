let errors = {
  message: "",
  status: 200,
};
const ErrorCode = (code) => {

  if (code === "INV_EMAIL") {
    errors.message = "Invalid email format";
    errors.status = 400;
  }
  if (code === "ID_MISMATCH") {
    return "Cannot find the record with that ID.";
  }
  //Roles
  if (code === "ROLES_DUP_ENTRY") {
    return "This role has already been added.";
  }
  if(code === "EMAIL_DUP_ENTRY"){
    errors.message = "This email address is already taken.";
    errors.status = 400;
  }
  if (code === "INV_DOMAIN") {
    errors.message = "Your email id's domain name is invalid.";
    errors.status = 400;
  }
  if (code === "EMAIL_SEND_FAIL") {
    errors.message = "Failed to send an email";
    errors.status = 500;
  }
  if (code === "INV_PASS_COMP") {
    errors.message = "Password must be atleast 8 characters long, 1 special character and a number";
    errors.status = 405;
  }
  if (code === "INV_PASS_STR") {
    errors.message = "Password is too common to guess.";
    errors.status = 405;
  }
  if (code === "INV_PASS_CONFIRM") {
    errors.message = "Passwords mismatch";
    errors.status = 405;
  }
  if (code === "USR_NT_FOUND") {
    errors.message = "User not found";
    errors.status = 405;
  }
  if (code === "TWO_FA_ENA") {
    errors.message = "Two-factor authentication is already enabled";
    errors.status = 405;
  }
  if (code === "INV_LOGIN_EMAIL") {
    errors.message = "Invalid email used for login.";
    errors.status = 405;
  }
  if (code === "INV_LOGIN_PASSWORD") {
    errors.message = "Invalid password used for login.";
    errors.status = 405;
  }
  if (code === "CODE_MISMATCH") {
    errors.message = "code is not valid.";
    errors.status = 405;
  }
  if (code === "ENB_TWOFA") {
    errors.message = "Enable two factor auth.";
    errors.status = 405;
  }
  if (code === "CODE_EMPTY") {
    errors.message = "code is not valid.";
    errors.status = 405;
  }
  if (code === "DENY_ACCESS") {
    errors.message = "Access denied.";
    errors.status = 401;
  }
  if (errors.message != "") {
    return errors;
  }
};
module.exports = ErrorCode;

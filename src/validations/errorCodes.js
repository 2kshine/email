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
  
  if (errors.message != "") {
    return errors;
  }
};
module.exports = ErrorCode;

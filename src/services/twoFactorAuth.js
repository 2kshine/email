const speakeasy = require("speakeasy");
const qrCode = require("qrcode");

const TwoFactorAuth = async ({ user }) => {
  //Check user object.
  if (! (await user)) {
    const error = new Error("User not found");
    error.code = "USR_NT_FOUND";
    throw error;
  }
  //Check if two factor is enabled
  if(user.secret_key){
    const error = new Error("Two-factor authentication is already enabled");
    error.code = "TWO_FA_ENA";
    throw error;
  }
  //Generate TOTP secret and QR code for the user
  const secret = speakeasy.generateSecret();
  const dataURL = await qrCode.toDataURL(secret.otpauth_url);

  //return TOTP QR code and secret key
  return {secret: secret, qrCode: dataURL}
};

module.exports = TwoFactorAuth;

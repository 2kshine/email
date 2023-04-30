const { authenticator } = require("otplib");
const QrCode = require("qrcode");
require("dotenv").config();
const GenerateTotpSecret = async (user) => {
  //Generate Totp secret
  const secret = authenticator.generateSecret();

  //Generate a URL for the secret.
  const otpauthUrl = authenticator.keyuri(
    user.first_name,
    process.env.APP_NAME,
    secret
  );

  //GEnerate qr code for the otpauthurl
  const qrCode = await QrCode.toDataURL(otpauthUrl);

  return {
    secret: secret,
    qrCode: qrCode,
  };
};

module.exports = GenerateTotpSecret;

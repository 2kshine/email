const { authenticator } = require("otplib");
const GenerateRecoveryCodes = require("./generateRecoveryCode");

const VerifyTotpSecret = async (code, secret, user) => {
    console.log(code)
  const isValid = authenticator.verify({ token: code, secret: secret });
  console.log(isValid);

  if (isValid) {
    //generate recovery codes once verified.
    //Recovery codes
    const recovery_codes = GenerateRecoveryCodes();
    //To convert string back to array use
    //JSON.parse(string)
    await user.update({
      two_factor_recovery_code: recovery_codes,
    });
    return true;
  } else {
    return false;
  }
};

module.exports = VerifyTotpSecret;

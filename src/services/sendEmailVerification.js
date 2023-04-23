const nodemailer = require("nodemailer");
require("dotenv").config();
const SendEmailVerification = async (randomToken, user_id, email) => {
  const url = `${process.env.BASE_URL}api/v1/users/${user_id}/verify/${randomToken}`;
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: process.env.EMAIL_PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Verify Email Address",
      html: '<p>Please click on the following link to verify your email address:</p>'+
      `<a href=${url}>${url}</a>`
      ,
    });
    return true;
  } catch (err) {
    console.log("failed to send email" + err);
    const error = new Error("Failed sending an email");
    error.code = "EMAIL_SEND_FAIL";
    throw error;
  }
};


module.exports = SendEmailVerification
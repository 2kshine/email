const nodemailer = require("nodemailer");
require("dotenv").config();
const SendEmailVerification = async (email, randomToken) => {
  const url = `${process.env.UX_URL}/users/verify-email?token=${randomToken}`;
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "62123ef61d2232",
        pass: "66bee75509dd69"
      }
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Verify Email Address",
      html: '<p>Please click on the following link to verify your email address:</p>'+
      `<a href=${url}>${url}</a>`
      ,
    });
  } catch (err) {
    console.log("failed to send email" + err);
    const error = new Error("Failed sending an email");
    error.code = "EMAIL_SEND_FAIL";
    throw error;
  }
};


module.exports = SendEmailVerification
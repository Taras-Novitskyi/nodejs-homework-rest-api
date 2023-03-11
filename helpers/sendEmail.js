const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_MAIL_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_MAIL_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "novitskyitaras@gmail.com" };

  try {
    const response = await sgMail.send(email);
    console.log("Email sent");

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;

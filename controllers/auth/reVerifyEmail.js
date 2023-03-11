const { NotFound, BadRequest } = require("http-errors");

const { sendEmail } = require("../../helpers");
const { User } = require("../../service/schemas");

const verifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw BadRequest(`missing required field email`);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound(`User not found`);
  }

  const verificationToken = user.verificationToken;

  if (!verificationToken) {
    throw BadRequest(`Verification has already been passed`);
  }

  const mail = {
    to: email,
    subject: "Confirmation registration",
    text: "Confirm your email",
    html: `<a target="_blank" href="http://localhost:3001/api/users/verify/${verificationToken}">Confirm your email</a>`,
  };

  await sendEmail(mail);

  res.status(200).json({
    Status: "Success",
    code: 200,
    ResponseBody: {
      message: "Verification email sent",
    },
  });
};

module.exports = verifyEmail;

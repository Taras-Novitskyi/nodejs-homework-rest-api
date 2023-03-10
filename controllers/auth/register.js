const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uuid = require('uuid');

const { User } = require("../../service/schemas");
const { sendEmail } = require('../../helpers');

const register = async (req, res) => {
  const { name, email, password, subscription, token } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email "${email}" in use`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = uuid.v4();

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    token,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Confirmation registration",
    text: "Confirm your email",
    html: `<a target="_blank" href="http://localhost:3001/api/users/verify/${verificationToken}">Confirm your email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    Status: "Created",
    code: 201,
    ResponseBody: {
      message: "Verification email sent",
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = register;

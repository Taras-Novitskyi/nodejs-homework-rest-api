const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../service/schemas");

const register = async (req, res) => {
  const { name, email, password, subscription, token } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email "${email}" in use`);
  }
  
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    token,
  });
	
  res.status(201).json({
    Status: "Created",
    code: 201,
    ResponseBody: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = register;

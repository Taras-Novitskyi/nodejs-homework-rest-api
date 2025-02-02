const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../service/schemas");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verify) {
    throw new Unauthorized(`Email or password is wrong`);
  }

  const passwordCompare = bcrypt.compareSync(password, user.password);

  if (!passwordCompare) {
    throw new Unauthorized(`Email or password is wrong`);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: "Success",
    code: 200,
    ResponseBody: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;

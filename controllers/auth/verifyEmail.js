const { NotFound } = require("http-errors");
const { User } = require("../../service/schemas");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
	const user = await User.findOne({ verificationToken });

  if (!user) {
    throw NotFound(`User not found`);
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

  res.status(200).json({
    Status: "Success",
    code: 200,
    ResponseBody: {
      message: "Verification successful",
    },
  });
};

module.exports = verifyEmail;

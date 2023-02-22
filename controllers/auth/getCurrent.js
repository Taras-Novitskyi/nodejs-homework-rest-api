const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    Status: "Success",
    code: 200,
    ResponseBody: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = getCurrent;

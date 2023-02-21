const createError = require("http-errors");
const { User } = require("../../service/schemas");

const updateSubscription = async (req, res, next) => {
  const { _id, email } = req.user;

  if (!req.body || !req.body.subscription) {
    return next(createError(400, "Missing field subscription"));
  }

  const validSubscription = ["starter", "pro", "business"].includes(
    req.body.subscription
  );

  if (!validSubscription) {
    return next(createError(400, "Incorrect field subscription"));
  }

  const updatedStatusSubscription = await User.findOneAndUpdate(
    { _id },
    { subscription: req.body.subscription },
    { new: true }
  );

  if (!updatedStatusSubscription) {
    return next(createError(404, "Not found"));
  }

  res.status(200).json({
    status: "success",
    code: 200,
    ResponseBody: {
      user: {
        email,
        subscription: updatedStatusSubscription.subscription,
      },
    },
  });
};

module.exports = updateSubscription;

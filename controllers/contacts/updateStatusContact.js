const createError = require("http-errors");
const { updateStatusContact } = require("../../service");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;

  if (!req.body) {
    return next(createError(400, "Missing field favorite"));
  }

  const updatedStatusContact = await updateStatusContact(contactId, req.body);

  if (!updatedStatusContact) {
    return next(createError(404, "Not found"));
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result: updatedStatusContact },
  });
};

module.exports = updateStatus;

const createError = require("http-errors");
const { updateContact } = require("../../service");

const update = async (req, res, next) => {
  const { contactId } = req.params;

  if (!req.body) {
    return next(createError(400, "Missing field favorite"));
  }

  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    return next(createError(404, "Not found"));
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result: updatedContact },
  });
};

module.exports = update;

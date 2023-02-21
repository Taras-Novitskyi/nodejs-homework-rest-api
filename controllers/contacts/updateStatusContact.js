const createError = require("http-errors");
const { Contact } = require("../../service/schemas/contacts");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  // eslint-disable-next-line no-prototype-builtins
  const validStatus = req.body.hasOwnProperty("favorite");

  if (!req.body || !validStatus) {
    return next(createError(400, "Missing field favorite"));
  }

  const updatedStatusContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite: req.body.favorite },
    { new: true }
  );

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

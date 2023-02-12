const createError = require("http-errors");
const contsctsOperations = require("../../models/contacts");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const updatedContact = await contsctsOperations.updateContact(
    contactId,
    req.body
  );

  if (!updatedContact) {
    return next(createError(404, "Not found"));
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result: updatedContact },
  });
};

module.exports = updateContact;

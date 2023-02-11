const createError = require("http-errors");
const contsctsOperations = require("../../models/contacts");

const removeContact = async (req, res, next) => {
  const deletedContact = await contsctsOperations.removeContact(
    req.params.contactId
  );

  if (!deletedContact) {
    return next(createError(404, "Not found"));
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { message: "contact deleted" },
  });
};

module.exports = removeContact;

const createError = require("http-errors");
const { Contact } = require("../../service/schemas/contacts");

const remove = async (req, res, next) => {
  const deletedContact = await Contact.findByIdAndRemove({
    _id: req.params.contactId,
  });

  if (!deletedContact) {
    return next(createError(404, "Not found"));
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { message: "contact deleted" },
  });
};

module.exports = remove;

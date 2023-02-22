const createError = require("http-errors");
const { Contact } = require("../../service/schemas/contacts");

const getById = async (req, res, next) => {
  const contact = await Contact.findOne({ _id: req.params.contactId });
  if (!contact) {
    return next(createError(404, "Not found"));
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result: contact },
  });
};

module.exports = getById;

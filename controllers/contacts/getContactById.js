const createError = require("http-errors");
const contsctsOperations = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  const contact = await contsctsOperations.getContactById(req.params.contactId);
  if (!contact) {
    return next(createError(404, "Not found"));
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result: contact },
  });
};

module.exports = getContactById;

const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);

  if (!isCorrectId) {
    return next(createError(400, `${contactId} is not correct id format`));
  }

  next();
};

module.exports = isValidId;

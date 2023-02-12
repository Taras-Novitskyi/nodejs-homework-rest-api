const validation = (schema) => {
  return async (req, res, next) => {
    const { error } = await schema.validate(req.body);

    if (error) {
      error.status = 400;
      error.message = "Missing required fields";
      next(error);
    }
    next();
  };
};

module.exports = validation;

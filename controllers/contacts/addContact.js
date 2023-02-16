const { createContact } = require("../../service");

const create = async (req, res, next) => {
  const newContact = await createContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: newContact },
  });
};

module.exports = create;

const { Contact } = require("../../service/schemas/contacts");

const create = async (req, res, next) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: newContact },
  });
};

module.exports = create;

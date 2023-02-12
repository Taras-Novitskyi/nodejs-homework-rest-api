const contsctsOperations = require("../../models/contacts");

const addContact = async (req, res, next) => {
  const newContact = await contsctsOperations.addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: newContact },
  });
};

module.exports = addContact;

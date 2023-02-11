const contsctsOperations = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  const allContacts = await contsctsOperations.listContacts();

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result: allContacts },
  });
};

module.exports = getAllContacts;

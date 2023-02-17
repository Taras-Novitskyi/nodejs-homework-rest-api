const { getAllContacts } = require("../../service");

const getAll = async (req, res, next) => {
  const allContacts = await getAllContacts();

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result: allContacts },
  });
};

module.exports = getAll;

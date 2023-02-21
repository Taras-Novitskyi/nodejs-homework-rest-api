const { Contact } = require("../../service/schemas/contacts");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  let { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const searchParams = favorite ? { owner: _id, favorite } : { owner: _id };

  const allContacts = await Contact.find(searchParams, "", {
    skip,
    limit,
  }).populate("owner", "_id name email");

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result: allContacts },
  });
};

module.exports = getAll;

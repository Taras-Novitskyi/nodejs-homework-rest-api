const { userRegisterSchema, userLoginSchema, User } = require("./user");
const { contactSchema, statusContactSchema, Contact } = require("./contacts");

module.exports = {
  contactSchema,
  statusContactSchema,
  Contact,
  userRegisterSchema,
  userLoginSchema,
  User,
};

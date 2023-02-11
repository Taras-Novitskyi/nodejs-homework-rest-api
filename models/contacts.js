const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(`${__dirname}`, "/contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = await contacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.find((contact) => contact.id === contactId);

  if (!deletedContact) {
    return null;
  }

  const result = await contacts.filter((contact) => contact.id !== contactId);
  await updateContacts(result);
  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const [updatedContact] = contacts.filter(
    (contact) => contact.id === contactId
  );

  if (!updatedContact) {
    return null;
  }

  updatedContact.name = name;
  updatedContact.email = email;
  updatedContact.phone = phone;

  await updateContacts(contacts);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactsSchema } = require("../../schema");

const validateMiddleware = validation(contactsSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContacts));
router.get("/:contactId", ctrlWrapper(ctrl.getContactById));
router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));
router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router;

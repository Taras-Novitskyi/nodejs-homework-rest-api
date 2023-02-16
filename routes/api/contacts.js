const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validation, isValidId, ctrlWrapper } = require("../../middlewares");
const { contactSchema, statusContactSchema } = require("../../service/schemas");

const validateMiddleware = validation(contactSchema);
const validateStatusMiddleware = validation(statusContactSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContacts));
router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));
router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));
router.put(
  "/:contactId",
  validateMiddleware,
  isValidId, ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validateStatusMiddleware, isValidId, 
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;

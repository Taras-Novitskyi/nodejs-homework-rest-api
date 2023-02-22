const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../../service/schemas");

const validateRegisterMiddleware = validation(userRegisterSchema);
const validateLoginMiddleware = validation(userLoginSchema);

const router = express.Router();

router.post(
  "/register",
  validateRegisterMiddleware,
  ctrlWrapper(ctrl.register)
);
router.post("/login", validateLoginMiddleware, ctrlWrapper(ctrl.login));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/", auth, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;

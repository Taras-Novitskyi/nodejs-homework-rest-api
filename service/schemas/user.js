const mongoose = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../../helpers");

const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: {
      type: String,
        required: [true, "Set name for user"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: [true, "Avatar is required"],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

user.post("save", handleMongooseError);

const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
  avatarURL: Joi.string(),
  token: Joi.string(),
});

const userLoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required(),
  token: Joi.string(),
});

const User = mongoose.model("user", user);

module.exports = { User, userRegisterSchema, userLoginSchema };

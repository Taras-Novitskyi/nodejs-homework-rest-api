const fs = require("fs").promises;
const createError = require("http-errors");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../service/schemas");

const storeImage = path.join(__dirname, "../../public/avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: temporaryName, originalname } = req.file;

  const avatar = await Jimp.read(temporaryName);

  try {
    await avatar.resize(250, 250).write(temporaryName);
  } catch (error) {
    throw new Error(error.message);
  }

  const fileName = `${_id}_${originalname}`;
  const resultName = path.join(storeImage, fileName);

  try {
    await fs.rename(temporaryName, resultName);

    const avatarURL = path.join("public", "avatars", fileName);
    const updatedUserAvatar = await User.findByIdAndUpdate(
      { _id },
      { avatarURL },
      { new: true }
    );

    if (!updatedUserAvatar) {
      return next(createError(404, "Not found"));
    }

    res.status(200).json({
      status: "success",
      code: 200,
      ResponseBody: {
        message: "File uploaded successfully",
        avatarURL,
      },
    });
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
};

module.exports = updateAvatar;

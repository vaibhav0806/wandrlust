const { mongoose } = require("mongoose");

const {
  NAME_REQUIRED,
  PHONE_REQUIRED,
  EMAIL_REQUIRED,
  USERNAME_REQUIRED,
  PASSWORD_REQUIRED
} = require("../errors/mongoose");

const {
  validatePhone,
  validateEmail,
  validateUserName,
} = require("../errors/validate");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, NAME_REQUIRED],
    },
    phone: {
      type: Number,
      required: [true, PHONE_REQUIRED],
      unique: true,
    //   validate: {
    //     validator: (e) => validatePhone(e),
    //   },
    },
    email: {
      type: String,
      required: [true, EMAIL_REQUIRED],
      unique: true,
    //   validate: {
    //     validator: (e) => validateEmail(e),
    //   },
    },
    username: {
      type: String,
      required: [true, USERNAME_REQUIRED],
      unique: true,
    //   validate: {
    //     validator: (e) => validateUserName(e),
    //   },
    },
    password: {
      type: String,
      required: [true, PASSWORD_REQUIRED],
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

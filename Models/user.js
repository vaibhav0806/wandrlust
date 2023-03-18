const { mongoose } = require("mongoose");

const {
  NAME_REQUIRED,
  PHONE_REQUIRED,
  EMAIL_REQUIRED,
  USERNAME_REQUIRED,
  PASSWORD_REQUIRED,
  AGE_REQUIRED
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
      // validate: {
      //   validator: (phone) => /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/.test(phone),
      // },
    },
    email: {
      type: String,
      required: [true, EMAIL_REQUIRED],
      unique: true,
      // validate: {
      //   validator: (email) => /^[a-z0-9_\.-]+\@[a-z0-9\-]+\.[a-z]+$/.test(email.toLowerCase()),
      // },
    },
    username: {
      type: String,
      required: [true, USERNAME_REQUIRED],
      unique: true,
      // validate: {
      //   validator: (username) => /^[a-zA-Z0-9_-]{6,16}$/.test(username),
      // },
    },
    password: {
      type: String,
      required: [true, PASSWORD_REQUIRED],
      unique: false
    },
    age: {
      type: Number,
      required: [true, AGE_REQUIRED]
    },
    gender:{
      type: String,
      required: false
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

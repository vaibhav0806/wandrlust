const User = require("../Models/user");
const { bcrypt } = require("bcrypt");
const { jwt } = require("jsonwebtoken");
const { createError } = require("http-errors")

const register = async (req, res, next) => {
    console.log("Register function in the controller....");
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      username: req.body.username,
      password: hash,
      age: req.body.age,
      gender: req.body.gender ? req.body.gender : "",
    });
    await newUser.save();
    res.status(200).send("Your account has been Created!");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong Password! or Username"));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};

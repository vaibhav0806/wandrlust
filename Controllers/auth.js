const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const session = require("../Session/session");

const register = async (req, res, next) => {
  try {
    const saltRounds = 10;
    console.log(req.body);
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        const newUser = await new User({
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          username: req.body.username,
          password: hash,
          age: req.body.age,
          gender: req.body.gender ? req.body.gender : "",
        });
        await newUser.save();
        res.status(200).json({message: "User Registered Successfully"})
      });
    });
  } catch (err) {
    console.log(err);
    res.send({ message: `Error ${err}` });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      // return next(createError(404, "User not found!"));
      return res
        .status(404)
        .json({message: "User not found!"})
    }
    if (user.blocked) {
      return res
        .status(404)
        .json({message: "User Blocked!"})
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res
      .status(404)
      .json({message: "Password Incorect!"});
    }

    const { password, _id, ...otherDetails } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .status(200);

    session.name = user.name;
    session.isLoggedIn = true;
    session.phonenumber = user.phone;
    session.email = user.email;
    session.username = user.username;
    session.age = user.age;
    session.gender = user.gender;
    session._id = user._id;
    session.blocked = user.blocked;
    session.followers = user.followers;
    session.following = user.following;
    res.status(200).send({message: "Status 200! User verified!"});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};

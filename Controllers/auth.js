const User = require("../Models/user");
const  bcrypt  = require("bcrypt");
const jwt  = require("jsonwebtoken");
const createError = require("http-errors");

const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err,salt) => {
      bcrypt.hash(req.body.password,salt,async(err,hash)=>{
        console.log("Hash value: ",hash);
        const newUser = await new User({
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          username: req.body.username,
          password: hash,
          age: req.body.age,
          gender: req.body.gender ? (req.body.gender) : "",
        });
        await newUser.save();
      })
    })
    console.log(window.location);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    console.log(req.body);
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
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong Password! or Username"));
    }
    console.log(user._doc);
    const { password, _id, ...otherDetails } = user._doc;
    console.log(user._id);
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'})
    res.cookie("access_token", token, {httpOnly: true}).status(200).json({...otherDetails})
    console.log("Login SuccessFull");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
};

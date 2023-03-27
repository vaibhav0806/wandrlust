const jwt = require("jsonwebtoken");
const session = require("../Session/session");
const User = require("../Models/user");

const auth = (req, res, next) => {
  let token = req.cookies && req.cookies.accessToken;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        // res.redirect("/login");
        console.log(err);
      }
      const user = await User.findOne({
        _id: decoded.id,
      });
      session.name = user.name;
      session.isLoggedIn = true;
      session.phonenumber = user.phone;
      session.email = user.email;
      session.username = user.username;
      session.age = user.age;
      session.gender = user.gender;
    });
  } else {
    session.isLoggedIn = false;
  }
  next();
};

module.exports = { auth };

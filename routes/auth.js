const { login, register } = require("../Controllers/auth");
const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const router = Router();
const session = require("../Session/session");
const nodemailer = require("nodemailer");

router.post("/signup", register);
router.post("/signin", login);

router.get("/", (req, res) => {
  res.render("home", {
    name: session.name.substring(0, session.name.indexOf(" "))
      ? session.name.substring(0, session.name.indexOf(" "))
      : session.name,
    isLoggedIn: session.isLoggedIn,
    email: session.email,
    username: session.username,
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    name: session.name.substring(0, session.name.indexOf(" "))
      ? session.name.substring(0, session.name.indexOf(" "))
      : session.name,
    isLoggedIn: session.isLoggedIn,
    email: session.email,
    username: session.username,
  });
});

router.get("/test", (req, res) => {
  res.render("test");
});

router.get("/login", (req, res) => {
  if (session.isLoggedIn) {
    return;
  } else {
    res.render("login");
  }
});

router.get("/logout", (req, res) => {
  session.isLoggedIn = false;
  console.log(session.isLoggedIn);
  res.clearCookie("accessToken");
  res.redirect("/");
});

router.get("/faq", (req, res) => {
  res.render("faq", {
    name: session.name.substring(0, session.name.indexOf(" "))
      ? session.name.substring(0, session.name.indexOf(" "))
      : session.name,
    isLoggedIn: session.isLoggedIn,
    email: session.email,
    username: session.username,
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    name: session.name.substring(0, session.name.indexOf(" "))
      ? session.name.substring(0, session.name.indexOf(" "))
      : session.name,
    isLoggedIn: session.isLoggedIn,
    email: session.email,
    username: session.username,
  });
});

router.use("/", auth);

router.post("/sendMail", (req, res) => {
  const { name, email, message } = req.body;
  console.log(name, email, message);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vaibhav.pandey0806@gmail.com",
      pass: "farimahhzsrpxeff",
    },
  });

  let mailOptions = {
    from: "vaibhav.pandey0806@gmail.com",
    to: email,
    subject: "Query Received | Wandrlust",
    text: `Hi, ${name}!\nWe have recieved your query and we'll be working on it and replying to you very soon!\n\nQuery: ${message}\nFrom: ${email}\n\n\nRegards,\nWandrlust Team`,
  };
  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log("Mail not sent.", err);
    } else {
      console.log(
        "Success, email has been sent, and your account has been verified!!",
        success
      );
    }
  });
  res.redirect("/contact");
});

router.get("/profile", (req, res) => {
  if (session.isLoggedIn) {
    res.render("profile", {
      name: session.name,
      isLoggedIn: session.isLoggedIn,
      email: session.email,
      username: session.username,
      phonenumber: session.phonenumber,
      age: session.age,
    });
  } else {
    res.render("home", {
      name: session.name.substring(0, session.name.indexOf(" "))
        ? session.name.substring(0, session.name.indexOf(" "))
        : session.name,
      isLoggedIn: session.isLoggedIn,
      email: session.email,
      username: session.username,
    });
  }
});

router.get("/post", (req, res) => {
  if (session.isLoggedIn) {
    res.render("post", {
      name: session.name.substring(0, session.name.indexOf(" "))
        ? session.name.substring(0, session.name.indexOf(" "))
        : session.name,
      isLoggedIn: session.isLoggedIn,
      email: session.email,
      username: session.username,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/locations", (req, res) => {
  if (session.isLoggedIn) {
    res.render("location", {
      name: session.name.substring(0, session.name.indexOf(" "))
        ? session.name.substring(0, session.name.indexOf(" "))
        : session.name,
      isLoggedIn: session.isLoggedIn,
      email: session.email,
      username: session.username,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/feed", (req, res) => {
  if (session.isLoggedIn) {
    res.render("feed", {
      name: session.name.substring(0, session.name.indexOf(" "))
        ? session.name.substring(0, session.name.indexOf(" "))
        : session.name,
      isLoggedIn: session.isLoggedIn,
      email: session.email,
      username: session.username,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/budget", (req, res) => {
  if (session.isLoggedIn) {
    res.render("budget", {
      name: session.name.substring(0, session.name.indexOf(" "))
        ? session.name.substring(0, session.name.indexOf(" "))
        : session.name,
      isLoggedIn: session.isLoggedIn,
      email: session.email,
      username: session.username,
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;

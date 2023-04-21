const express = require("express");
const path = require("path");
const { DB_URL } = require("./config");
const { mongoose } = require("mongoose");
var bodyParser = require("body-parser");
const AuthRoute = require("./routes/auth");
const AdminRoute = require("./routes/admin");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
var PORT = process.env.PORT || 6969;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const connect = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(DB_URL);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log(err);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb Disconnected.");
});

app.use("/", AuthRoute);
app.use("/admin", AdminRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  connect();
  console.log("Listening on port ", PORT);
});

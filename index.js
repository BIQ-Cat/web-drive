const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const app = express();
const route_account = require("./routes/account")
if (env.env === "development") {
  app.use(cors());
  require("dotenv").config();
}
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
mongoose.connect(process.env.ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(route_account)
app.listen(env.port)
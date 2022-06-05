const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
router.post("/reg", (req, res) => {
  let sent = false;
  User.findOne({ login: req.body.login }, (err, user) => {
    if (err) throw err;
    if (user) {
      sent = true;
      res.json({
        success: err ? false : true,
        msg: "User exists",
        code: 401,
        data: {},
      });
    }
  });
  if (sent) return;
  let newUser = User.create({
    name: req.body.name,
    email: req.body.email,
    login: req.body.login,
    password: req.body.password,
  });
  newUser.save((err, user) =>
    res.json({
      success: err ? false : true,
      msg: err ? "Internal server error" : "Successiful",
      code: err ? 500 : 200,
      data: {},
    })
  );
});

router.post("/auth", (req, res) => {});

module.exports = router;

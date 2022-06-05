const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
});
UserSchema.pre("save", (next) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) throw err;
      this.password = hash;
      return next();
    });
  });
});
UserSchema.methods.isValidPassword = (password) =>
  bcrypt.compare(password, this.password);
module.exports = mongoose.model("User", UserSchema);

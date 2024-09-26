import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
    maxLength: [30, "Must be less than 30 characters. name"],
  },
  username: {
    type: String,
    required: [true, "Please enter your username."],
    maxLength: [20, "Must be less than 20 characters. username"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password 6 must be a characters"],
    select: false,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  avatar: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  this.username = this.username.replace(/\s+/g, "").toLowerCase();
  this.name = this.name.replace(/\s+/g, "").toLowerCase();
  this.email = this.email.replace(/\s+/g, "").toLowerCase();

  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
const User = mongoose.model("User", userSchema);

export default User;

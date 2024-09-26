import catchAsyncError from "../middleware/catch.middleware.js";
import User from "../models/auth.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

const register = catchAsyncError(async (req, res, next) => {
  const { name, username, email, password, gender, confirmPassword } = req.body;
  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !gender ||
    !confirmPassword
  ) {
    return next(new ErrorHandler("Please all fields", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwordds do not match", 400));
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return next(new ErrorHandler("Username already exists", 400));
  }

  const profilePic = `https://robohash.org/${username}.png`;

  const user = await User.create({
    name,
    username,
    email,
    password,
    gender,
    avatar: profilePic,
  });
  sendToken(user, 201, res);
});

const login = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler("Please enter username & password", 400));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid username or password"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("password does not match", 401));
  }
  sendToken(user, 201, res);
});

const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("jwtToken", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export default { register, login, logout };

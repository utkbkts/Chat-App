import User from "../models/auth.model";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "./catch.middleware";
import jwt from "jsonwebtoken";
export const isAuthenticatedUser = catchAsyncError(async (req, res) => {
  const { jwtToken } = req.cookies;

  if (!jwtToken) {
    return next(new ErrorHandler("login first to access this resource", 401));
  }
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

import catchAsyncError from "../middleware/catch.middleware.js";
import User from "../models/auth.model.js";

const getUserProfile = catchAsyncError(async (req, res) => {
  const loggedInUser = req.user._id;

  const filterUser = await User.find({ _id: { $ne: loggedInUser } }).lean();

  res.status(201).json({
    filterUser,
  });
});
export default { getUserProfile };

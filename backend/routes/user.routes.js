import express from "express";
import userController from "../controllers/user.controllers.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticatedUser, userController.getUserProfile);

export default router;

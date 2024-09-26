import express from "express";
import messageControllers from "../controllers/message.controllers.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send/:id", isAuthenticatedUser, messageControllers.sendMessage);
router.get("/:id", isAuthenticatedUser, messageControllers.getMessages);

export default router;

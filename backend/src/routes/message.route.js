import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import {
    getMessagesController,
    sendMessageController,
    sidebarUserController,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/user", isLoggedIn, sidebarUserController);
router.get("/:id", isLoggedIn, getMessagesController);
router.post("/send/:id", isLoggedIn, sendMessageController);

export default router;

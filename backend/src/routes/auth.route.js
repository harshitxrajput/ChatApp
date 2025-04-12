import express from "express";

import {
    getProfileController,
    loginController,
    logoutController,
    signupController,
    updateProfileController,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", isLoggedIn, logoutController);

router.put("/update-profile", isLoggedIn, updateProfileController);
router.get("/get-profile", isLoggedIn, getProfileController);

export default router;

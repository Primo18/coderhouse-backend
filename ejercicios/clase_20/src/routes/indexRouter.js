import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { ensureAuthenticated, redirectIfAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

// Home page
router.get("/", (req, res) => {
    res.render("home", { title: "Home", style: "home.css", user: req.session.user });
});

// Profile page
router.get("/profile", ensureAuthenticated, authController.getProfile);


// Logout
router.get("/logout", ensureAuthenticated, authController.logout);

// Register page
router.get("/register", redirectIfAuthenticated, authController.showRegisterForm);
router.post("/api/register", redirectIfAuthenticated, authController.register);

// Login page
router.get("/login", redirectIfAuthenticated, authController.showLoginForm);
router.post("/api/login", redirectIfAuthenticated, authController.login);

// Change password page
router.get("/change-password", ensureAuthenticated, authController.showChangePasswordForm);
router.post("/api/change-password", ensureAuthenticated, authController.changePassword);

export default router;
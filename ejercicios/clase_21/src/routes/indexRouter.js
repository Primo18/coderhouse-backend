import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { ensureAuthenticated, redirectIfAuthenticated } from "../middlewares/authMiddleware.js";
import passport from "passport";

const router = Router();

// Home page
router.get("/", authController.getHome);

// Profile page
router.get("/profile", ensureAuthenticated, authController.getProfile);


// Logout
router.get("/logout", ensureAuthenticated, authController.logout);

// Register page
router.get("/register", redirectIfAuthenticated, authController.showRegisterForm);
// router.post("/api/register", redirectIfAuthenticated, authController.register);

// Register page with passport
router.post("/api/register", redirectIfAuthenticated, passport.authenticate("signup", { failureRedirect: "/register" }), authController.showLoginForm);

// Login page
router.get("/login", redirectIfAuthenticated, authController.showLoginForm);
// router.post("/api/login", redirectIfAuthenticated, authController.login);

// Login page with passport
router.post("/api/login", redirectIfAuthenticated, passport.authenticate("login", {
    successRedirect: "/profile",
    failureRedirect: "/login"
}), authController.getProfile);

// Change password page
router.get("/change-password", ensureAuthenticated, authController.showChangePasswordForm);
router.post("/api/change-password", ensureAuthenticated, authController.changePassword);

export default router;
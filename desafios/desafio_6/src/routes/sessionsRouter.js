import { Router } from "express";
import passport from "passport";

const router = Router();

// Login user with GitHub
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// Callback for GitHub
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
});

export default router;

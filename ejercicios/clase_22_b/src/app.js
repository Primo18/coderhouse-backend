import express from "express";
import initPassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
initPassport();
app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
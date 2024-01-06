import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils.js';

export const getProfile = (req, res) => {
    const { first_name, last_name, email, age, role } = req.user;
    res.render('profile', {
        role, first_name, last_name, email, age, title: 'Profile Page', style: 'profile.css'
    });
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = new User({ first_name, last_name, email, age, password: hashedPassword });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Register error:', error);
        res.redirect('/register');
    }
};

export const showRegisterForm = (req, res) => {
    res.render('register', { title: 'Register Page', style: 'register.css' });
};

export const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login Page', style: 'login.css' });
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.redirect('/login');
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.redirect('/login');
        }
        req.session.user = user;
        res.redirect('/profile');
    } catch (error) {
        console.error('Login error:', error);
        res.redirect('/login');
    }
};


export const showChangePasswordForm = (req, res) => {
    res.render('change-password', { title: 'Change Password Page', style: 'change-password.css' });
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ _id: req.session.user._id });
        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.redirect('/change-password');
        }
        const hashedPassword = await hashPassword(newPassword);
        await User.updateOne({ _id: req.session.user._id }, { password: hashedPassword });
        res.redirect('/profile');
    } catch (error) {
        console.error('Change password error:', error);
        res.redirect('/change-password');
    }
};


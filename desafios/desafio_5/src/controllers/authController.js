import User from '../dao/models/User.js';
import bcrypt from 'bcryptjs';

export const getProfile = (req, res) => {
    const { first_name, last_name, email, age, role } = req.session.user;
    res.render('profile', { first_name, last_name, email, age, role, title: 'Profile Page', style: 'profile.css' });
};

export const showRegisterForm = (req, res) => {
    res.render('register', {
        title: 'Register Page',
        style: 'register.css'
    });
};

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ first_name, last_name, email, age, password: hashedPassword });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.redirect('/register');
    }
};

export const showLoginForm = (req, res) => {
    res.render('login', {
        title: 'Login Page',
        style: 'login.css'
    });
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.redirect('/products');
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.redirect('/login');
    }
};

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            // manejar usuario no encontrado
            return res.redirect('/login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // manejar contraseña incorrecta
            return res.redirect('/login');
        }
        req.session.user = user;
        // Modificar el rol si es un usuario administrador con el correo admin@admin
        if (user.email === 'admin@admin') {
            req.session.user.role = 'admin';
        }

        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};


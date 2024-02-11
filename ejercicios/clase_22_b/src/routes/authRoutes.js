import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { passportCall } from '../utils.js';
import { authorization } from '../middleware/authMiddleware.js';

const authRouter = Router();

// Endpoint de login que genera un token JWT al autenticar con éxito
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const user = { email, password, role: 'admin' };
        const token = jwt.sign(user, 'secret', { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true });
        res.json({ message: 'Login successful' });
    } else {
        res.sendStatus(401);
    }
});

authRouter.get('/current', passportCall('jwt', { session: false }), authorization('user'), (req, res) => {
    res.json(req.user);
});


export default authRouter;

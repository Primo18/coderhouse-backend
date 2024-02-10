import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const token = jwt.sign({ email }, 'my_secret_key', { expiresIn: '1h' });
        res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).send('You are logged in');
    }
    else {
        res.status(400).send('You need to provide email and password');
    }
});

export default router;
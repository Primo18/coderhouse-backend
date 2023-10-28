import { Router } from 'express';
import * as userController from '../controllers/userController.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.render('home', {
        user: req.session.user,
        title: "Inicio",
        style: "home.css"
    });
});


// Ruta para la página de perfil, protegida para que solo los usuarios autenticados puedan acceder
router.get('/profile', ensureAuthenticated, userController.getProfile);

export default router;

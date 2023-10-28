// authRoutes.js
import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { ensureAuthenticated, redirectIfAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

// Ruta para mostrar el formulario de registro
router.get('/register', redirectIfAuthenticated, authController.showRegisterForm);

// Ruta para manejar la lógica de registro
router.post('/api/sessions/register', redirectIfAuthenticated, authController.register);

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', redirectIfAuthenticated, authController.showLoginForm);

// Ruta para manejar la lógica de inicio de sesión
router.post('/api/sessions/login', redirectIfAuthenticated, authController.postLogin); // Actualizado a postLogin

// Ruta para cerrar sesión
router.get('/logout', ensureAuthenticated, authController.logout);

export default router;

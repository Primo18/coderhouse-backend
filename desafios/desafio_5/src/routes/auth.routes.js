import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { ensureAuthenticated, redirectIfAuthenticated } from '../middleware/authMiddleware.js';
import { renderHomePage, renderRealTimeProducts, renderChat, renderCartPage } from '../controllers/viewHandlers.js';


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
router.get('/profile', ensureAuthenticated, authController.getProfile);

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

// Rutas para las páginas de productos, carrito y chat
router.get('/realtimeproducts', renderRealTimeProducts);
router.get('/chat', renderChat);
router.get('/products', ensureAuthenticated, renderHomePage);
router.get('/carts/:cid', renderCartPage);


export default router;

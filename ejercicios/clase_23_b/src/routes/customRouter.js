import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.applyGlobalMiddleware();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {
        // Aquí se definen las rutas de la aplicación usando los métodos get, post, etc. de la instancia de Router
    }

    // Método applyRoute para evitar repetir código en get, post, put, etc.
    applyRoute(method, path, requireAuth, handlers) {
        const middleware = [requireAuth ? authMiddleware : null].filter(Boolean);
        const wrappedHandlers = handlers.map(h => this.applyCallback(h));
        this.router[method](path, ...middleware, ...wrappedHandlers);
    }

    get(path, requireAuth = false, ...handlers) {
        this.applyRoute('get', path, requireAuth, handlers);
    }

    post(path, requireAuth = false, ...handlers) {
        this.applyRoute('post', path, requireAuth, handlers);
    }

    put(path, requireAuth = false, ...handlers) {
        this.applyRoute('put', path, requireAuth, handlers);
    }

    // Y así sucesivamente para DELETE, etc.

    // 2. Centralización de la configuración de respuestas
    // generateCustomResponses también podría ser un nombre adecuado
    applyGlobalMiddleware() {
        this.router.use((req, res, next) => {
            res.success = (data) => res.status(200).json({ data });
            res.error = (message, statusCode = 400) => res.status(statusCode).json({ error: message });
            res.notFound = (message = 'Not Found') => res.status(404).json({ error: message });
            res.unauthorized = (message = 'Unauthorized') => res.status(401).json({ error: message });
            next();
        });
    }

    // 3. Manejo de errores robusto en applyCallback
    applyCallback(handler) {
        return async (req, res, next) => {
            try {
                await handler(req, res, next);
            } catch (error) {
                console.error(error); // Log del error
                res.error('An unexpected error occurred.', 500); // Respuesta genérica de error
            }
        };
    }
}

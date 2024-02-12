import CustomRouter from './customRouter.js';
import UsersController from '../controllers/usersController.js';
import { dynamicAccessMiddleware } from '../utils/middleware.js';

export default class UsersRouter extends CustomRouter {
    init() {
        // Aquí se asume que dynamicAccessMiddleware(10) también verifica la autenticación
        // Si dynamicAccessMiddleware solo maneja la autorización, deberías incluir un middleware de autenticación antes
        this.get('/admin', true, dynamicAccessMiddleware(10), UsersController.adminGreeting);
        // Para rutas que no requieren autenticación
        this.get('/', false, UsersController.generalGreeting);
        // Si actualizar usuario requiere autenticación
        this.put('/:userId', true, UsersController.updateUser);
    }
}

import CustomRouter from './customRouter.js';
import UsersController from '../controllers/usersController.js';

export default class UsersRouter extends CustomRouter {
    init() {
        // Ajuste en UsersRouter
        this.get('/admin', ['ADMIN'], UsersController.adminGreeting);
        this.get('/', ['PUBLIC'], UsersController.generalGreeting);
        // Actualiza el usuario requiere autenticación y posiblemente un rol específico
        this.put('/:userId', ['USER', 'ADMIN'], UsersController.updateUser);
    }
}

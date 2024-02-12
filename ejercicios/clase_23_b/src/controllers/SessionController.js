import jwt from 'jsonwebtoken';

export default class SessionController {
    static login(req, res) {
        try {
            const { username, password } = req.body;

            // Verificar que se hayan proporcionado el nombre de usuario y la contraseña
            if (!username || !password) {
                return res.error('Username and password are required', 400);
            }

            // Simular la verificación de credenciales
            if (username === 'admin' && password === 'password') {
                const user = {
                    id: 1,
                    username: 'admin',
                    role: 'ADMIN'
                };

                // Firmar el token con el secreto y la expiración
                const token = jwt.sign(user, 'secret', { expiresIn: '1h' });

                // Enviar el token como respuesta
                return res.success({ token });
            } else {
                // En caso de credenciales inválidas
                return res.unauthorized('Invalid username or password');
            }
        } catch (error) {
            // Manejar errores inesperados, como problemas con jwt.sign o variables de entorno faltantes
            console.error('Login error:', error);
            return res.error('An error occurred during the login process', 500);
        }
    }
}

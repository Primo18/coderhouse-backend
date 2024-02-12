import jwt from 'jsonwebtoken';

const handlePolicies = (policies) => {
    return (req, res, next) => {
        // Si es público, sigue adelante sin necesidad de comprobar el token
        if (policies.includes('PUBLIC')) {
            return next();
        }

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.unauthorized('Authentication token is missing.');
        }

        try {
            const decoded = jwt.verify(token, 'secret');
            req.user = decoded; // Almacenar el usuario decodificado en la solicitud para su uso posterior
            const userRole = decoded.role.toUpperCase();

            // Permitir el acceso si la ruta requiere autenticación y el token es válido
            if (policies.includes('AUTHENTICATED') && userRole) {
                return next();
            }

            // Comprobar si el rol del usuario está dentro de las políticas permitidas
            if (policies.includes(userRole)) {
                return next();
            }

            return res.unauthorized('You do not have permission to access this resource.');
        } catch (error) {
            return res.error('Invalid or expired token.', 401);
        }
    };
};

export default handlePolicies;

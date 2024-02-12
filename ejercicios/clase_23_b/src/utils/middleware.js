// Función para middleware de acceso dinámico que sirve para proteger rutas según el nivel de acceso del usuario
export function dynamicAccessMiddleware(accessLevel) {
    return function (req, res, next) {
        if (req.user.accessLevel >= accessLevel) {
            next();
        } else {
            res.status(403).json({ error: 'Access denied' });
        }
    };
}
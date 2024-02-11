export const authorization = (role) => (req, res, next) => {
    if (req.user && req.user.role === role) {
        next();
    } else {
        res.status(403).json({ message: 'No permissions' });
    }
};


// Sistema Basado en Permisos
// Para una granularidad aún mayor,
// podrías implementar un sistema basado en permisos además de los roles.
// Cada rol tendría un conjunto de permisos que definen operaciones específicas que el usuario puede realizar.
// const roles = {
//     admin: ['createPost', 'editAnyPost', 'deleteAnyPost'],
//     editor: ['createPost', 'editOwnPost'],
//     user: ['readPost']
// };

// export const hasPermission = (permission) => (req, res, next) => {
//     const userPermissions = roles[req.user.role];
//     if (req.user && userPermissions && userPermissions.includes(permission)) {
//         next();
//     } else {
//         res.status(403).json({ message: 'No permissions' });
//     }
// };

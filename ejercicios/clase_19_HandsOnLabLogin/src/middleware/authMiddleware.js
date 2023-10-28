export const ensureAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

export const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile');
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    // Si no es admin, redirigir a alguna otra página o mostrar un mensaje de error
    res.redirect('/not-authorized');
};


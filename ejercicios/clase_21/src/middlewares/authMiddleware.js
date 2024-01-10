export const ensureAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect('/login');
};

export const redirectIfAuthenticated = (req, res, next) => {
    if (req.user) {
        return res.redirect('/profile')
    }
    next();
};

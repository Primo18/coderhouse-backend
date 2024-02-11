import passport from 'passport';

export const passportCall = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            const message = info.message ? info.message : info.toString();
            return res.status(401).json({ error: message });
        }
        req.user = user;
        next();
    })(req, res, next);
};

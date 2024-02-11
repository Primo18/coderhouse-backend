import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// Extracts the token from the cookie
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const options = {};
options.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor]);
options.secretOrKey = 'secret';

const initPassport = () => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        console.log(jwt_payload);
        return done(null, jwt_payload);
    }));
};



export default initPassport;
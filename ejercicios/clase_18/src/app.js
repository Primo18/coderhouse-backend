import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

console.log(process.cwd());


// Middlewares
app.use(cookieParser("secret"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Usar true en caso de HTTPS
}));


// app.get('/setCookie', (req, res) => {
//     res.cookie('string', 'cookie', { expires: new Date(Date.now() + 900000) });
//     res.cookie('json', {
//         name: 'cookie',
//         property: 'delicious!'
//     });
//     res.cookie('array', [1, 2, 3], { maxAge: 900000 });
//     res.redirect('/getCookie');
// });

// app.get('/getCookie', (req, res) => {
//     const string = req.cookies.string;
//     const json = req.cookies.json;
//     const array = req.cookies.array;
//     res.send(`string: ${string}, json: ${JSON.stringify(json)}, array: ${array}`);
// });

// app.get('/clearCookie', (req, res) => {
//     res.clearCookie('string');
//     res.clearCookie('json');
//     res.clearCookie('array');
//     res.redirect('/getCookie');
// })

// app.get('/setSignedCookie', (req, res) => {
//     res.cookie('signed', 'cookie', { signed: true });
//     res.redirect('/getSignedCookie');
// });

// app.get('/getSignedCookie', (req, res) => {
//     const signed = req.signedCookies.signed;
//     res.send(`signed: ${signed}`);
// });

// app.get('/clearSignedCookie', (req, res) => {
//     res.clearCookie('signed');
//     res.redirect('/getSignedCookie');
// });

// app.get('/', (req, res) => {
//     res.sendFile(`${process.cwd()}/index.html`);
// });

// app.post('/setCookie', (req, res) => {
//     const { email, name } = req.body;
//     res.cookie(`${name}`, email, { maxAge: 10000 });
//     res.redirect('/getCookie');
// });

// app.get('/getCookie', (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies);
//     res.send(`Cookies: ${JSON.stringify(cookies)}`);
// });

app.get('/session', (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`You have visited this page ${req.session.views} times`);
    } else {
        req.session.views = 1;
        res.send('Welcome to this page for the first time!');
    }
});

app.get('/session/destroy', (req, res) => {
    req.session.destroy();
    res.send('Session destroyed');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Aquí se haría la autenticación real, consultando a una base de datos, por ejemplo.
    if (username && password === 'password') {
        req.session.isAuthenticated = true;
        req.session.user = { username };
        res.send('Logged in');
    } else {
        res.send('Invalid credentials');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.isAuthenticated) {
        res.send(`Hello ${req.session.user.username}, welcome to your dashboard`);
    } else {
        res.send('Please log in first');
    }
});

// Middleware para admin
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.username === 'admin') {
        next();
    } else {
        res.send('You are not authorized to view this page');
    }
};


app.get('/admin', isAdmin, (req, res) => {
    res.send('Hello admin, welcome to your dashboard');
});


app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out');
        }
        res.send('Logged out');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
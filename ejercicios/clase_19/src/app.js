import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';

const app = express();
const PORT = 3000;

const fileStorage = FileStore(session);

app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: new fileStorage({
        path: './sessions', ttl: 100, retries: 0
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
}));

// MongoStore
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: 'mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/?retryWrites=true&w=majority' }),
//     cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
//     retries: 0,
// }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


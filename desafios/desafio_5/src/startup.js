import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import MONGO_URI from './config/config.js';
import productsRoutes from './routes/products.routes.js';
import cartsRoutes from './routes/carts.routes.js';
import messagesRoutes from './routes/messages.routes.js';
import authRoutes from './routes/auth.routes.js';


export function setUpMiddleware(app, io) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(
        session({
            store: MongoStore.create({
                mongoUrl: MONGO_URI,
                mongoOptions: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                },
            }),
            secret: "secret",
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: 600000,
            },
        })
    );
    // Middleware para adjuntar io a req
    app.use((req, res, next) => {
        req.io = io;
        next();
    });
}

export function setUpRoutes(app) {
    app.use('/api/products', productsRoutes);
    app.use('/api/carts', cartsRoutes);
    app.use('/api/messages', messagesRoutes);
    app.use('/', authRoutes);
}

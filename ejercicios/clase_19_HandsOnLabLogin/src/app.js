import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
import db from "./config/db.js";
import router from "./routes/indexRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import __dirname from './utils.js';

// Connect to MongoDB
db.then(() => console.log("Connected to MongoDB")).catch((err) =>
    console.log(err)
);

const app = express();
const PORT = 3000;

// Static files
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

//  Configurar Handlebars como template engine
app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");



// Configurar Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// Session
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/handsonlablogin?retryWrites=true&w=majority",
        }),
        secret: "miClaveSecreta",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 6000000,
        },
    })
);

// Rutas
app.use("/", router);
app.use("/", authRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

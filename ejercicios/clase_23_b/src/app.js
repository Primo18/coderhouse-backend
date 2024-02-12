import express from "express";
import UsersRouter from "./routes/usersRouter.js";
import SessionRouter from "./routes/sessionRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = new UsersRouter();
app.use("/users", usersRouter.getRouter());
app.use("/session", new SessionRouter().getRouter());

app.listen(PORT, () => { console.log(`Server is running at http://localhost:${PORT}`); });
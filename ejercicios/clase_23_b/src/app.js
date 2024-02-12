import express from "express";
import UsersRouter from "./routes/usersRouter.js";

const app = express();
const PORT = 3000;

const usersRouter = new UsersRouter();
app.use("/users", usersRouter.getRouter());

app.listen(PORT, () => { console.log(`Server is running at http://localhost:${PORT}`); });
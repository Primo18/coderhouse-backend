import express from "express";
import mongoose from "mongoose";
import { estudiantesRouter } from "./routes/estudiantes.router.js";

const app = express();
const PORT = 3000;
const uri = "mongodb+srv://primo:Rust.1830@devcluster.9xzyesc.mongodb.net/colegio?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Atlas Cluster with Mongoose ODM
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected...");
});

// Close Mongoose connection when Node process ends
process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// Routes
app.use("/api/students", estudiantesRouter);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
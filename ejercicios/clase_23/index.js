import express from 'express';
import petRouter from './petRouter.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pets', petRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
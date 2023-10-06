import express from 'express';
import petsRouter from './routes/pets.router.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { upload } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pets', petsRouter);

// Multer
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Archivo subido con éxito');
});

app.post('/upload-multiple', upload.array('files'), (req, res) => {
    res.send('Archivos subidos con éxito');
});

app.listen(port, () => {
    console.log(`Server is up on port http://localhost:${port}`);
});
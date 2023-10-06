import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [
    { id: 1, title: "Completar desafio 1", done: false },
    { id: 2, title: "Completar desafio 2", done: false },
    { id: 3, title: "Completar desafio 3", done: false },
]

app.get('/tasks', (req, res) => {
    res.send(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        res.status(404).send('Task not found!');
    }
    res.send(task);
});

app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.send(tasks);
});

app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        res.status(404).send('Task not found!');
    }
    task.done = !task.done;
    res.send(task);
});

app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        res.status(404).send('Task not found!');
    }
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    res.send(task);
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
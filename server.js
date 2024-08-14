const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/gestion-taches', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('Task', TaskSchema);

app.post('/tasks', async (req, res) => {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${3000}`);
});

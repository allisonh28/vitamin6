const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let todos = [];

//GET /todos: retrieve all todo items
app.get('/todos', (req, res) => {
    res.json(todos);
  });

//POST /todos: Add a new todo item
  app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).send("Task is required");
    }
    const newTodo = { id: todos.length + 1, task: task };
    todos.push(newTodo);
    saveFile();
    res.status(201).json(newTodo);
  });
  
//PUT /todos: Add an existing todo item
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    if (!task) {
        return res.status(400).send("Task is required");
    }
    const todo = todos.find((t) => t.id === parseInt(id));
  
    if (todo) {
      todo.task = task;
      res.json(todo);
      saveFile();
    } else {
      res.status(404).send('To-Do item not found');
    }
  });
  
  //DELETE /todos: delete a todo item
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter((t) => t.id !== parseInt(id));
    res.status(204).send();
  });

  //save to file
  function saveFile() {
    fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
  }
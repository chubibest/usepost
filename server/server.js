import express from 'express';
import {
  addItem,
  checkItem,
  getItem,
  getAll,
  removeItem,
  getAllCompleted,
  getAllUncompleted
} from './models/operations';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/todos', addItem);
app.get('/todos', getAllCompleted, getAllUncompleted, getAll);
app.get('/todos/:item', getItem);
app.delete('/todos/:item', removeItem);
app.patch('/todos/:item', checkItem);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;

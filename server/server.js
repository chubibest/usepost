import express from 'express';
import {
  addItem,
  // checkItem,
  getItem,
  getAll
} from './models/operations';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/todos', addItem);
app.get('/todos', getAll);
app.get('/todos/:item', getItem);

app.listen(3000, () => console.log('started server'));

export default app;

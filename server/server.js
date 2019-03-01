import express from 'express';
import {
  addItem,
  checkItem,
  getItem
} from './models/operations';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/todos', addItem);
app.get('/todos', checkItem);
app.get('/todos/:item', getItem);

app.listen(3003, () => console.log('started server'));

export default app;

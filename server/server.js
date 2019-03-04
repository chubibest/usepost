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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;

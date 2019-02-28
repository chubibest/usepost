const express = require('express');
const {
  addItem,
  checkItem,
  removeItem,
  getItem,
  getAll
} = require('./models/operations');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/todos', addItem);

app.get('/todos', (req, res) => {
  getAll().then(result => res.send(result));
});
app.listen(3000, () => console.log('started server'));

module.exports = app;

const express = require('express');
// const bodyParser = require('body-parser')
// express now has this funcitonality built in. see lines 11 and 12
const {
  addItem,
  getAll
} = require('./models/operations');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/todos', addItem); // addItem is now a middleware function

app.get('/todos', (req, res) => {
  getAll().then(result => res.send(result));
});
app.listen(3000, () => console.log('started server'));

module.exports = app;

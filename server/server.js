const express = require('express');
const bodyParser = require('body-parser');
const {
  addItem,
  checkItem,
  removeItem,
  getItem
} = require('./models/operations');

const app = express();

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
  // cant quite get addItem from userTablejs to return res.rows to  result please help 
  addItem(req.body).then((resp) => {
    res.send(resp);
    console.log(resp, 'here it is');
  });
});
app.listen(3000, () => console.log('connected to server'));

module.exports = app;

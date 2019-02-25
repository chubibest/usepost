const express = require('express');
const bodyParser = require('body-parser');
const { addItem, checkItem, removeItem } = require('./models/userTable');

const app = express();

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
  const result = addItem(req.body);
  console.log(JSON.stringify(result), 'emeka');
});
app.listen(3000, () => console.log('connected to server'));

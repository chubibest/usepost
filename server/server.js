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
import * as userMethods from './models/userOperations';

const { verifyUser: verify } = userMethods;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SERVE STATIC FILE HERE
app.use('/', express.static(`${__dirname}/server/views/index.html`));

// app.get('/', (req, res) => {
//   res.send(__dirname + '/server/views/index');
// });


app.post('/login', userMethods.loginUser);
app.post('/account', userMethods.createUser);
app.post('/todos', verify, addItem);
app.get('/todos', verify, getAllCompleted, getAllUncompleted, getAll);
app.get('/todos/:item', verify, getItem);
app.delete('/todos/:item', verify, removeItem);
app.patch('/todos/:item', verify, checkItem);
app.delete('/delete', verify, userMethods.deleteUser);

const port = process.env.PORT || 3000;
app.listen(port);

export default app;

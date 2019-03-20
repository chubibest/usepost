import query from '../db/pg';
import {
  hashpassword, isValidEmail, generateToken, matchpassword, verifyToken
} from './helper';
import * as queries from '../db/utils';

const valuesMissing = {
  status: 'bad request',
  message: 'Some values are missing'
};
const inValidEmail = {
  status: 'bad request',
  message: 'Input valid email'
};


const createUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send(valuesMissing);
  }
  if (!isValidEmail(req.body.email)) {
    return res.status(400).send(inValidEmail);
  }
  try {
    const hashedpassword = await hashpassword(req.body.password);
    const result = await query(queries.createUserQuery(req.body.email, hashedpassword));
    const token = generateToken(result[0].id);
    res.status(200).send({
      status: 'success',
      message: 'account created',
      token
    });
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    // return res.status(400).send(error);
  }
};
const loginUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send(valuesMissing);
  }
  if (!isValidEmail(req.body.email)) {
    return res.status(400).send(inValidEmail);
  }
  try {
    const result = await query(queries.getUserQuery(req.body.email));
    if (!result[0]) {
      return res.status(400).send({
        message: 'The credentials you provided is incorrect'
      });
    }
    const trueOrFalse = await matchpassword(req.body.password, result[0].password);
    if (!trueOrFalse) {
      return res.status(400).send({ message: 'Incorrect Password' });
    }
    const token = generateToken(result[0].id);
    return res.status(200).send({ token });
  } catch (e) {
    return res.status(500).send({ e });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await query(queries.removeUserQuery(req.user.id));
    if (!result[0]) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.status(204).send({ message: 'deleted' });
  } catch (error) {
    return res.status(404).send(error);
  }
};

const verifyUser = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).send({ message: 'Token is not provided' });
  }
  try {
    const decoded = await verifyToken(token);
    // const result = await query(queries.getUserByIdQuery(decoded.id));
    // if (!result[0]) {
    //   return res.status(400).send({ message: 'The token you provided is invalid' });
    // }
    req.user = { id: decoded.id };
    next();
  } catch (e) {
    return res.status(400).send(e);
  }
};
export {
  createUser,
  loginUser,
  deleteUser,
  verifyUser
};

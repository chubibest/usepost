import query from '../db/pg';
import {
  addItemQuery,
  getAllQuery,
  checkItemQuery,
  getItemQuery,
  removeItemQuery,
  statusQuery
} from '../db/utils';

const addItem = async (req, res) => {
  if (!req.body.text) {
    return res.status(400).send({
      status: 'bad request',
      message: 'please send correct input'
    });
  }
  if (req.body.text.trim().length < 1) {
    return res.status(403).send({
      status: 'Forbidden!',
      message: 'please send correct input'
    });
  }
  try {
    const result = await query(addItemQuery(req.body.text));
    return res.status(201).send({
      status: 'success',
      result
    });
  } catch (e) {
    if (e.name === 'error') {
      return res.status(409).send({
        status: 'error',
        message: 'item already exist'
      });
    }
    res.status(500).send({
      status: 'error',
      message: 'server error'
    });
  }
};
const getAll = async (req, res) => {
  if (req.query.completed) {
    const result = await query(statusQuery(req.query.completed));
    switch (req.query.completed) {
      case ('true'):
        if (!result[0]) {
          return res.status(200).send({
            status: 'error',
            messayge: 'No completed todoes'
          });
        }
        res.status(200).send({
          status: 'success',
          completedtodoes: result
        });
        break;
      case ('false'):
        if (!result[0]) {
          return res.status(200).send({
            status: 'error',
            messayge: 'No uncompleted todoes'
          });
        }
        res.status(200).send({
          status: 'success',
          unfinishedtodoes: result
        });
        break;
      default:
        break;
    }
    return;
  }
  try {
    const result = await query(getAllQuery());
    if (!result[0]) {
      return res.status(200).send({
        status: 'error',
        messayge: 'No todos to display'
      });
    }
    res.status(200).send({
      status: 'success',
      getAll: 'from get all',
      result
    });
  } catch (e) {
    res.status(500).send({
      status: 'error',
      e
    });
  }
};
const getItem = async (req, res) => {
  try {
    const result = await query(getItemQuery(req.params.item));
    if (result[0] === undefined) {
      return res.status(404).send({
        status: 'error',
        message: 'Item not found',
        sender: 'getItem'
      });
    }
    return res.status(200).send({
      status: 'success',
      yay: 'yay',
      result
    });
  } catch (e) {
    res.status(500).send({
      status: 'error',
      message: 'could not fetch item'
    });
    return e;
  }
};


const checkItem = async (req, res) => {
  try {
    const result = await query(checkItemQuery(req.params.item));
    if (!result[0]) {
      return res.status(404).send({
        status: 'error',
        message: 'Item not found'
      });
    }
    res.status(205).send({
      status: 'updated',
      result
    });
  } catch (e) {
    res.status(500).send({
      status: 'error',
      message: 'could not update item'
    });
  }
};

const removeItem = async (req, res) => {
  const parameter = req.params.item;
  try {
    const result = await query(removeItemQuery(parameter));
    if (!result[0]) {
      return res.status(404).send({
        status: 'error',
        error: 'item not found',
      });
    }
    res.status(205).send({
      status: 'success',
      message: 'Item Deleted'
    });
  } catch (e) {
    res.status(500).send({
      status: 'error',
      message: 'could not delete item'
    });
  }
};

export {
  addItem,
  checkItem,
  getItem,
  removeItem,
  getAll
};

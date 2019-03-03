import query from '../db/pg';
import {
  addItemQuery,
  getAllQuery,
  // checkItemQuery,
  getItemQuery
  // removeItemQuery
} from '../db/utils';

const addItem = (req, res) => {
  const userInput = req.body.text;
  if (!req.body.text) {
    return res.status(400).send({
      status: 'bad request',
      message: 'please send correct input'
    });
  }
  const trimmed = userInput.trim();

  if (trimmed.length < 1) {
    return res.status(403).send({
      status: 'Forbidden!',
      message: 'please send correct input'
    });
  }
  query(addItemQuery(userInput))
    .then((result) => {
      if (result.name === 'error') {
        return res.status(409).send({
          status: 'error',
          message: 'item already exist'
        });
      }
      return res.status(201).send({
        status: 'success',
        result
      });
    }).catch((e) => {
      res.status(500).send({
        status: 'error',
        message: 'server error'
      });
      return e;
    });
};
const getAll = (req, res) => {
  query(getAllQuery()).then(result => res.status(200).send({
    status: 'success',
    getAll: 'from get all',
    result
  })).catch((e) => {
    res.status(500).send({
      status: 'error',
      e
    });
  });
};
const getItem = (req, res) => {
  query(getItemQuery(req.params.item))
    .then((result) => {
      console.log(JSON.stringify(result));
      //
      // if staement being ignored
      //
      if (result[0] === undefined) {
        return res.status(404).send({
          status: 'error',
          message: 'Item not found',
          sender: 'getItem'
        });
      }
      res.status(200).send({
        status: 'success',
        yay: 'yay',
        result
      });
    }).catch((e) => {
      res.status(500).send({
        status: 'error',
        message: 'could not fetch item'
      });
      throw e;
    });
};


// const checkItem = (req, res) => {
//   query(checkItemQuery(req.body.text))
//     .then(result => res.status(205).send({
//       status: 'updated',
//       result: result[0]
//     })).catch((e) => {
//       res.status(404).send({
//         status: 'error',
//         message: 'could not update item'
//       });
//       throw e;
//     });
// };


// const removeItem = (req, res) => {
//   query(removeItemQuery())
//   .then(result => res.status(205).send({
//   status: 'success',
//   result: result[0]
// })).catch((e) => {
//   res.send({
//     status: 'error',
//     message: 'could not delete item'
//   });
//   throw e;
// });
// };


export {
  addItem,
  // checkItem,
  getItem,
  // removeItem
  getAll
};

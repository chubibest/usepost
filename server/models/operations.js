import query from '../db/pg';
import {
  addItemQuery,
  // checkItemQuery,
  getItemQuery,
  // removeItemQuery
  getAllQuery
} from '../db/utils';

const addItem = (req, res) => {
  query(addItemQuery(req.body.text))
    .then(result => res.status(201).send({
      status: 'success',
      result
    })).catch((e) => {
      res.status(500).send({
        status: 'error',
        message: 'server error'
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

const getItem = (req, res) => {
  query(getItemQuery(req.params.item))
    .then((result) => {
      console.log(JSON.stringify(result));
      //
      // if staement being ignored
      //
      if (result[0] === undefined) {
        res.status(404).send({
          status: 'error',
          message: 'Item not found'
        });
        return;
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

const getAll = (req, res) => {
  query(getAllQuery()).then(result => res.status(200).send({
    status: 'success',
    result
  })).catch((e) => {
    res.status(500).send({
      status: 'error',
      e
    });
  });
};

export {
  addItem,
  // checkItem,
  getItem,
  // removeItem
  getAll
};

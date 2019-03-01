import query from '../db/pg';
import { addItemQuery, checkItemQuery, getItemQuery } from '../db/utils';

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
const checkItem = (req, res) => {
  query(checkItemQuery(req.body.text))
    .then(result => res.status(205).send({
      status: 'updated',
      result: result[0]
    })).catch((e) => {
      res.status(404).send({
        status: 'error',
        message: 'could not update item'
      });
      throw e;
    });
};

const getItem = (req, res) => {
  query(getItemQuery(req.params.item))
    .then((result) => {
      console.log(JSON.stringify(result));
      //
      // if staement being ignored
      //
      if (result === []) {
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

// const removeItem = (item) => {
//   const query = {
//     text: 'DELETE FROM todoes WHERE item = $1 returning * ',
//     values: [item]
//   };
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

// const getAll = () => {
//   const query = {
//     text: 'SELECT * FROM todoes'
//   };
//   return connect.then(client => client.query(query).then((res) => {
//     console.log('results from getALl', res);
//     client.release();
//     return res;
//   }, (e) => {
//     console.log(e);
//     client.release();
//   })).catch(e => console.log(e));
// };

export {
  addItem,
  checkItem,
  getItem
};

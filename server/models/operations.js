import query from '../db/pg';
import { addItemQuery } from '../utility/queryObjects'; // abstract the queries, neater

const addItem = (req, res) => {
  const { text: item } = req.body;

  query(addItemQuery(item)).then((data) => {
    res.status(201).send({
      status: 'success',
      data
    });
  }).catch(() => {
    // if an error is thrown, you can then put the 'e' parameter and run console.log(e)
    res.status(500).send({
      status: 'error',
      message: 'could not save your item'
    });
  });
};

// const checkItem = (req, res) => {
//   const { item } = req.params;
//   query((checkItemQuery(item)));
// };

// const removeItem = (item) => {
//   const query = {
//     text: 'DELETE FROM todoes WHERE item = $1 returning *',
//     values: item
//   };
//   connect.then(client => client.query(query).then(
//     (res) => { console.log(res); client.release(); }, () => client.release()
//   ), e => console.log(e));
// };

// const getItem = (item) => {
//   const query = {
//     text: 'SELECT * FROM todoes WHERE item = $1 ',
//     values: [item]
//   };
//   return connect.then(client => client.query(query).then((res) => {
//     console.log(res);
//     client.release();
//     return res;
//   }, (e) => {
//     console.log(e);
//     client.release();
//   })).catch(e => console.log(e));
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

module.exports = {
  addItem,
  // checkItem,
  // removeItem,
  // getItem,
  // getAll
};

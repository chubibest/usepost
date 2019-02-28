import { query } from '../db/pg';

const addItem = (queryvalues) => {
  const queryText = {

    text: 'insert into todoes(item)  values ($1) returning *',
    values: [queryvalues.text]
  };
  query(queryText);
};
// const checkItem = (item) => {
//   const query = {
//     text: 'update todoes set completed = true , completed_at = now() where item = $1 returning *',
//     values: item
//   };
//   connect.then(client => client.query(query).then(
//     (res) => {
//       console.log(res.rows);
//       client.release();
//     }, () => client.release()
//   )).catch((e) => {
//     console.log(e);
//   });
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

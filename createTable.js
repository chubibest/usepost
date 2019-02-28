const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const connect = pool.connect();


const createUserTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS todoes (
     id serial primary key,
     item varchar(20) not null unique,
     created_at timestamptz not null default now(),
     completed boolean default false, 
      completed_at timestamptz default null)`;
  connect.then(client => client.query(query).then((res) => {
    client.release();
    console.log('this table was created', res);
  }, e => console.log(e)), e => console.log(e));
};


const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS todoes;';
  connect.then(client => client.query(queryText).then((res) => {
    client.release();
    console.log('this is the result', res);
  }, e => console.log(e))).catch(e => console.log(e));
};

module.exports = { createUserTable, dropUserTable };

require('make-runnable');

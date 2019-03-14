const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
const query = queryText => pool.connect()
  .then(client => client.query(queryText).then(() => client.release(), () => client.release())
    .catch(() => client.release()));


const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS todoes (
     id serial primary key,
     item varchar(20) not null unique,
     created_at timestamptz not null default now(),
     completed boolean default false, 
      completed_at timestamptz default null)`;
  query(queryText);
};


const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS todoes;';
  query(queryText);
};

module.exports = { createUserTable, dropUserTable };

require('make-runnable');

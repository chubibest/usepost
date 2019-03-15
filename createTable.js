const { Pool } = require('pg');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
dotenv.config();
let pool;
const databaseConnect = (connectionString) => {
  pool = new Pool(
    {
      connectionString
    }
  );
};
if (env === 'development' || env === 'production') databaseConnect(process.env.DATABASE_URL);


if (env === 'test') databaseConnect(process.env.TEST_DATABASE_URL);
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

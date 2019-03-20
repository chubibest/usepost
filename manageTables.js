const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const {
  NODE_ENV: env,
  DATABASE_URL,
  TEST_DATABASE_URL
} = process.env;

const connectionString = env === 'test' ? TEST_DATABASE_URL : DATABASE_URL;
const pool = new Pool(
  {
    connectionString
  }
);

const query = queryText => pool.connect()
  .then(client => client.query(queryText).then(() => client.release(), () => client.release())
    .catch(() => client.release()));


const createToDoesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS todoes (
     id serial primary key,
     item varchar(20) not null unique,
     created_at timestamptz not null default now(),
     completed boolean default false, 
    completed_at timestamptz default null,
    owner_id serial not null,
    FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE)
      `;
  query(queryText);
};

const createUsersTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users (
    id serial primary key,
    email varchar(256) not null unique,
    password varchar(256) not null,
    created_date TIMESTAMP default now(),
    modified TIMESTAMP)`;
  await query(queryText);
};
const dropToDoesTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS todoes;';
  await query(queryText);
};
const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users;';
  query(queryText);
};
const createTables = async () => {
  await createUsersTable();
  createToDoesTable();
};
const dropTables = async () => {
  await dropToDoesTable();
  dropUsersTable();
};
module.exports = {
  createTables,
  dropTables
};

require('make-runnable');

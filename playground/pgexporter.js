const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
  {
    connectionString: process.env.DATABASE_URL
  }
);

const addItem = (queryvalues) => {
  const query = {
    text: 'insert into todo(item)  values $1 returning *',
    values: [...queryvalues]
  };
  pool.connect().then(
    Client => Client.query(query))
    .then(res => Console.log(res), err => console.log(err));
};

addItem('poop');

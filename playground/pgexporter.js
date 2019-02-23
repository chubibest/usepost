const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
  {
    connectionString: process.env.DATABASE_URL
  }
);

const addItem = (queryvalues) => {
  const query = {
    // postgres returning error at or near $1  
    text: 'insert into todo(item)  values ($1) returning *',
    values: [...queryvalues]
  };
  pool.connect().then(
    client => client.query(query)
  )
    .then((res) => { console.log(res); client.release(); })
    .catch(e => console.log(e); client.release());
};

addItem(['pee']);

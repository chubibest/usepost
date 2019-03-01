import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
const pool = new Pool(
  {
    connectionString: process.env.DATABASE_URL
  }
);

const query = queryObj => pool.connect()
  .then(client => client.query(queryObj).then((res) => {
    client.release();
    console.log(JSON.stringify(res.rows));
    return res.rows;
  }, (e) => {
    console.log(e);
    client.release();
    return e;
  }));

export default query;

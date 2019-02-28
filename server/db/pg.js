import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL: connectionString } = process.env;
const pool = new Pool({ connectionString });

const query = queryObj => pool.connect()
  .then(client => client.query(queryObj).then((res) => {
    client.release();
    return res.rows;
  }, (e) => {
    client.release();
    throw e;
  }));

export default query;

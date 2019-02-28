import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
const pool = new Pool(
  {
    connectionString: process.env.DATABASE_URL
  }
);

const query = queryText => pool.connect()
  .then(client => client.query(queryText).then((res) => {
    client.release();
    return res.rows;
  }, () => client.release()));
export default query;

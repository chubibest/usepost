import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();
const pool = new Pool(
  {
    connectionString: process.env.DATABASE_URL
  }
);
const query = async (queryObj) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(queryObj);
    return result.rows;
  } finally {
    client.release();
  }
};
export default query;

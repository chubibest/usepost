import { Pool } from 'pg';
import * as dotenv from 'dotenv';

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

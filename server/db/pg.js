import { Pool } from 'pg';
import * as dotenv from 'dotenv';

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

import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

export const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: process.env.MYSQLDB_USER || 'root',
  password: process.env.MYSQLDB_PASSWORD || process.env.MYSQLDB_ROOT_PASSWORD,
  port: process.env.MYSQLDB_PORT || process.env.MYSQLDB_DOCKER_PORT,
  database: process.env.MYSQLDB_DATABASE
});

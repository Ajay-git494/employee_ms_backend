import knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3307),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  pool: { min: 1, max: 10 }
};

export const db = knex(config);

import pkg from "pg";
const { Pool } = pkg;
require('dotenv').config({ path: '../.env' });
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default pool;
/* Configurazione per Supabase (PostgreSQL)
import pkg from "pg";
const { Pool } = pkg;
require('dotenv').config({ path: '../.env' });
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
export default pool;
*/

// Configurazione per MySQL
import mysql from 'mysql2/promise';
require('dotenv').config({ path: '../.env' });
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'your_database'
});
export default pool;
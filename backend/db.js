// db.js
import pkg from 'pg';  // Import the entire 'pg' module as a default import
const { Pool } = pkg;  // Destructure Pool from the imported module
import dotenv from 'dotenv'; // Import dotenv package

dotenv.config();  // Load environment variables

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export { pool };  // Export pool

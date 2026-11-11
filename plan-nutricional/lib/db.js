// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,       // Ej: mysql-xxxxx.aivencloud.com
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // Ej: defaultdb o plan_nutricional
  waitForConnections: true,
  connectionLimit: 10,             // Límite conservador para Vercel [citation:6]
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false      // Necesario para Aiven si usas SSL
  }
});

export default pool;

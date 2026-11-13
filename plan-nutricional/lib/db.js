import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  connectTimeout: 10000,
  ssl: process.env.DB_SSL_CA
    ? {
        ca: process.env.DB_SSL_CA,
        rejectUnauthorized: true,
      }
    : {
        // Compatibilidad con proveedores administrados que requieren TLS
        // pero no entregan una CA para configurar en la aplicación.
        rejectUnauthorized: false,
      },
});

export default pool;

// // server/config/db.js
// import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();

// const pool = mysql.createPool({
//   // host: process.env.DB_HOST || "127.0.0.1",
//   host: process.env.DB_HOST || "localhost",
//   port: Number(process.env.DB_PORT || 3306),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// export default pool;


const mysql = require('mysql2/promise');
// const mysql = require('mysql2');
// require('dotenv').config();

const pool = mysql.createPool({
    // host: process.env.DB_HOST || '127.0.0.1',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'nexter_fm_db',
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0,
    timeZone: '+00:00',
    charset: 'utf8mb4'
});

module.exports = pool;
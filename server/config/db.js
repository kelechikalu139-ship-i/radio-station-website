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


// const mysql = require('mysql2/promise');
// // const mysql = require('mysql2');
// // require('dotenv').config();

// const pool = mysql.createPool({
//     // host: process.env.DB_HOST || '127.0.0.1',
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASS || '',
//     database: process.env.DB_NAME || 'nexter_fm_db',
//     waitForConnection: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     timeZone: '+00:00',
//     charset: 'utf8mb4'
// });

// module.exports = pool;

// FOR LOCAL DEVELOPMENT 

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z", // UTC
});

export default pool;



// FOR LIVE DEVELOPEMENT
// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 4000,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   timezone: "Z",
//   ssl: {
//     rejectUnauthorized: false   // ← VERY IMPORTANT for TiDB Cloud
//   }
// });

// export default pool;



// FOR CPANEL LIVE 

// db.js  (or wherever you keep your database config)
// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',           // Usually 'localhost' on cPanel
//   port: process.env.DB_PORT || 3306,                  // ← Important: Almost always 3306 on cPanel (not 4000!)
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
  
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   timezone: 'Z',

//   // === CRITICAL FOR cPanel ===
//   ssl: false,                          // cPanel MySQL usually does NOT require SSL
//   // OR use this safer version if you still get handshake issues:
//   // ssl: { rejectUnauthorized: false }
// });

// export default pool;
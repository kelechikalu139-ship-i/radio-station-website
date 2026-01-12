// middleware/checkBlacklist.js
// const pool = require("../config/db");

// async function isBlacklistedToken(token) {
//   if (!token) return false;
//   try {
//     // check exact token text and also jti in case you store jti
//     const [rows] = await pool.query(
//       "SELECT id FROM jwt_blacklist WHERE token = ? OR jti = ? LIMIT 1",
//       [token, token]
//     );
//     return rows.length > 0;
//   } catch (err) {
//     console.error("blacklist check error", err);
//     return false;
//   }
// }

// module.exports = { isBlacklistedToken };


// middleware/checkBlacklist.js
const pool = require("../config/db");

async function isBlacklistedToken(token) {
  if (!token) return false;
  try {
    const [rows] = await pool.query(
      "SELECT id FROM jwt_blacklist WHERE token = ? OR jti = ? LIMIT 1",
      [token, token]
    );
    return rows.length > 0;
  } catch (err) {
    console.error("blacklist check error", err);
    return false;
  }
}

module.exports = { isBlacklistedToken };

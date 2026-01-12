// // server/middleware/auth.js
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// export default function authMiddleware(req, res, next) {
//   const auth = req.headers.authorization;
//   if (!auth || !auth.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   const token = auth.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = payload; // payload should contain id, email, role
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// }


// const jwt = require('jsonwebtoken');

// // const JWT_SECRET = precess.env.JWT_SECRET || 'replace_this_secret';
// const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// function verifyToken(req, res, next){
//     const header = req.header.authorization || '';
//     const token = header.startsWith('Bearer ') ? header.slice(7) : null;
//     if(!token) return res.status(401).json({error: 'Unauthorized'});

//     try {
//         const decode = jwt.verify(token, JWT_SECRET);
//         req.admin = decode; // {id, email, role, iat, exp}
//         return next();
//     } catch (err) {
//         return res.status(401).json({error: 'Invalid token'});
//     }
// }

// function requireRole(...allowedRoles){
//     return (req, res, next) =>{
//         if(!req.admin) return res.status(401).json({error: 'Unauthorized'});
//         if(!allowedRoles.includes(req.admin.role)){
//             return res.status(403).json({error: 'Forbidden - insufficient role'});
//         }
//         return next();
//     };
// }

// module.exports = {verifyToken, requireRole};


// middleware/auth.js
// const jwt = require("jsonwebtoken");
// const { isBlacklistedToken } = require("./checkBlacklist");
// const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret";

// async function verifyToken(req, res, next) {
//   try {
//     const header = req.headers?.authorization || "";
//     const token = header && header.startsWith("Bearer ") ? header.slice(7) : null;
//     if (!token) return res.status(401).json({ error: "Unauthorized - no token" });

//     // check blacklist first
//     const black = await isBlacklistedToken(token);
//     if (black) return res.status(401).json({ error: "Token revoked" });

//     // verify
//     const payload = jwt.verify(token, JWT_SECRET);
//     // attach admin info
//     req.admin = { id: payload.id, email: payload.email, role: payload.role };
//     return next();
//   } catch (err) {
//     console.error("auth verify error", err?.message || err);
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// }

// function requireRole(...allowedRoles) {
//   return (req, res, next) => {
//     if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
//     if (!allowedRoles.includes(req.admin.role)) {
//       return res.status(403).json({ error: "Forbidden - insufficient role" });
//     }
//     return next();
//   };
// }

// module.exports = { verifyToken, requireRole };


// middleware/auth.js
// const jwt = require("jsonwebtoken");
// const { isBlacklistedToken } = require("./checkBlacklist");
// const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret";

// async function verifyToken(req, res, next) {
//   try {
//     const header = req.headers?.authorization || "";
//     const token = header && header.startsWith("Bearer ") ? header.slice(7) : null;
//     if (!token) return res.status(401).json({ error: "Unauthorized - no token" });

//     const black = await isBlacklistedToken(token);
//     if (black) return res.status(401).json({ error: "Token revoked" });

//     const payload = jwt.verify(token, JWT_SECRET);
//     req.admin = { id: payload.id, email: payload.email, role: payload.role };
//     return next();
//   } catch (err) {
//     console.error("auth verify error", err?.message || err);
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// }

// function requireRole(...allowedRoles) {
//   return (req, res, next) => {
//     if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
//     if (!allowedRoles.includes(req.admin.role)) {
//       return res.status(403).json({ error: "Forbidden - insufficient role" });
//     }
//     return next();
//   };
// }

// module.exports = { verifyToken, requireRole };


// server/middleware/auth.js
import jwt from "jsonwebtoken";
import { isBlacklistedToken } from "./checkBlacklist.js"; // ensure file extension & ESM export
const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret";

export async function verifyToken(req, res, next) {
  try {
    const header = req.headers?.authorization || "";
    const token = header && header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Unauthorized - no token" });

    const black = await isBlacklistedToken(token);
    if (black) return res.status(401).json({ error: "Token revoked" });

    const payload = jwt.verify(token, JWT_SECRET);
    req.admin = { id: payload.id, email: payload.email, role: payload.role, jti: payload.jti };
    return next();
  } catch (err) {
    console.error("auth verify error", err?.message || err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.admin) return res.status(401).json({ error: "Unauthorized" });
    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({ error: "Forbidden - insufficient role" });
    }
    return next();
  };
}


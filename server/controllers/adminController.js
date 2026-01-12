// // // controllers/adminController.js
// // const { validationResult } = require("express-validator");
// // const pool = require("../config/db");
// // const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");
// // const { v4: uuidv4 } = require("uuid");
// // const cloudinary = require("../config/cloudinary");

// // const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret";
// // const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// // async function adminCount() {
// //   const [rows] = await pool.query("SELECT COUNT(*) as c FROM admins");
// //   // rows[0].c contains the count
// //   return Number(rows[0]?.c || 0);
// // }

// // exports.register = async (req, res) => {
// //   // Validate
// //   const errors = validationResult(req);
// //   if (!errors.isEmpty())
// //     return res.status(400).json({ errors: errors.array() });

// //   const { email, password, role = "admin", name } = req.body;

// //   try {
// //     // bootstrap logic: first admin becomes superadmin
// //     const count = await adminCount();
// //     const finalRole = count === 0 ? "superadmin" : role;

// //     // disallow creating a superadmin via public register if admins already exist
// //     if (count > 0 && finalRole === "superadmin") {
// //       return res.status(403).json({ error: "Cannot create superadmin" });
// //     }

// //     // check email exists
// //     const [exists] = await pool.query(
// //       "SELECT id FROM admins WHERE email = ?",
// //       [email]
// //     );
// //     if (exists.length) {
// //       return res.status(409).json({ error: "Email already registered" });
// //     }

// //     // hash password
// //     const hash = await bcrypt.hash(password, SALT_ROUNDS);
// //     const id = uuidv4();
// //     let avatarUrl = null;

// //     // accept avatar_url in body (when client uploads first to Cloudinary)
// //     if (req.body?.avatar_url) {
// //       avatarUrl = req.body.avatar_url;
// //     } else if (req.file && req.file.buffer && process.env.CLOUDINARY_CLOUD_NAME) {
// //       // fallback: upload buffer to Cloudinary (base64)
// //       const b64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
// //         "base64"
// //       )}`;
// //       const result = await cloudinary.uploader.upload(b64, { folder: "admins" });
// //       avatarUrl = result.secure_url;
// //     }

// //     await pool.query(
// //       "INSERT INTO admins (id, email, password_hash, role, name, avatar_url) VALUES (?, ?, ?, ?, ?, ?)",
// //       [id, email, hash, finalRole, name || null, avatarUrl]
// //     );

// //     return res.json({ ok: true, id, role: finalRole });
// //   } catch (err) {
// //     console.error("register err", err);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // };

// // exports.login = async (req, res) => {
// //   const errors = validationResult(req);
// //   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

// //   const { email, password } = req.body;

// //   try {
 
// //     const [rows] = await pool.query(
// //       "SELECT id, email, password_hash, role, name FROM admins WHERE email = ?",
// //       [email]
// //     );

// //     if (!rows.length) {
// //       return res.status(401).json({ error: "Invalid credentials" });
// //     }

// //     const user = rows[0];
// //     const ok = await bcrypt.compare(password, user.password_hash);
// //     if (!ok) {
// //       return res.status(401).json({ error: "Invalid credentials" });
// //     }

// //     // create JWT
// //     const token = jwt.sign(
// //       { id: user.id, email: user.email, role: user.role },
// //       JWT_SECRET,
// //       { expiresIn: "8h" }
// //     );

// //     // update last login timestamp (use correct column name updated_at)
// //     await pool.query("UPDATE admins SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [user.id]);

// //     return res.json({
// //       token,
// //       admin: {
// //         id: user.id,
// //         email: user.email,
// //         role: user.role,
// //         name: user.name,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Login error", err);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // };

// // exports.me = async (req, res) => {
// //   try {
// //     const id = req.admin.id;
// //     const [rows] = await pool.query(
// //       "SELECT id, email, role, name, avatar_url, created_at FROM admins WHERE id = ?",
// //       [id]
// //     );
// //     if (!rows.length) return res.status(404).json({ error: "Not found" });
// //     return res.json({ admin: rows[0] });
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // };

// // exports.createAdmin = async (req, res) => {
// //   // protected: only superadmin should reach here (middleware)
// //   const { email, password, role = "admin", name } = req.body;
// //   if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

// //   try {
// //     const [exists] = await pool.query("SELECT id FROM admins WHERE email = ?", [email]);
// //     if (exists.length) return res.status(409).json({ error: "Email already exists" });

// //     const hash = await bcrypt.hash(password, SALT_ROUNDS);
// //     const id = uuidv4();
// //     await pool.query(
// //       "INSERT INTO admins (id, email, password_hash, role, name) VALUES (?, ?, ?, ?, ?)",
// //       [id, email, hash, role, name || null]
// //     );
// //     return res.json({ ok: true, id });
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // };

// // exports.listAdmins = async (req, res) => {
// //   try {
// //     const [rows] = await pool.query(
// //       "SELECT id, email, role, name, avatar_url, created_at FROM admins ORDER BY created_at DESC"
// //     );
// //     return res.json({ admins: rows });
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // };

// // exports.deleteAdmin = async (req, res) => {
// //   // read id from URL param
// //   const id = req.params.id;
// //   try {
// //     await pool.query("DELETE FROM admins WHERE id = ?", [id]);
// //     return res.json({ ok: true });
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // };


// // // controllers/adminController.js (append near other exports)
// // const jwtDecode = require("jsonwebtoken"); // we already use jwt earlier

// // exports.logout = async (req, res) => {
// //   try {
// //     // get token from Authorization header
// //     const auth = req.headers?.authorization || "";
// //     const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
// //     if (!token) return res.status(400).json({ error: "No token provided" });

// //     // decode without verifying to read exp/jti if present
// //     const payload = jwtDecode.decode(token) || {};

// //     // compute expiry from payload.exp (seconds) or fallback to 8h from now
// //     let expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 8);
// //     if (payload.exp) expiresAt = new Date(payload.exp * 1000);

// //     // prefer jti if present, otherwise use sub or null
// //     const jti = payload.jti || payload.sub || null;

// //     // store token record to blacklist
// //     await pool.query(
// //       "INSERT INTO jwt_blacklist (jti, token, expires_at) VALUES (?, ?, ?)",
// //       [jti, token, expiresAt]
// //     );

// //     return res.json({ ok: true, message: "Logged out" });
// //   } catch (err) {
// //     console.error("logout err", err);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // };


// // // controllers/adminController.js (add near other exports)
// // exports.countAdminsEndpoint = async (req, res) => {
// //   try {
// //     const [rows] = await pool.query("SELECT COUNT(*) AS c FROM admins");
// //     const count = Number(rows?.[0]?.c || 0);
// //     return res.json({ count });
// //   } catch (err) {
// //     console.error("countAdmins err", err);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // };



// // controllers/adminController.js
// const { validationResult } = require("express-validator");
// const pool = require("../config/db");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");
// const cloudinary = require("../config/cloudinary");

// const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret";
// const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// // helper: count admins
// async function adminCount() {
//   const [rows] = await pool.query("SELECT COUNT(*) as c FROM admins");
//   return Number(rows[0]?.c || 0);
// }

// exports.register = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty())
//     return res.status(400).json({ errors: errors.array() });

//   const { email, password, role = "admin", name } = req.body;

//   try {
//     const count = await adminCount();
//     const finalRole = count === 0 ? "superadmin" : role;
//     if (count > 0 && finalRole === "superadmin") {
//       return res.status(403).json({ error: "Cannot create superadmin" });
//     }

//     const [exists] = await pool.query("SELECT id FROM admins WHERE email = ?", [email]);
//     if (exists.length) {
//       return res.status(409).json({ error: "Email already registered" });
//     }

//     const hash = await bcrypt.hash(password, SALT_ROUNDS);
//     const id = uuidv4();
//     let avatarUrl = null;

//     if (req.body?.avatar_url) {
//       avatarUrl = req.body.avatar_url;
//     } else if (req.file && req.file.buffer && process.env.CLOUDINARY_CLOUD_NAME) {
//       const b64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
//       const result = await cloudinary.uploader.upload(b64, { folder: "admins" });
//       avatarUrl = result.secure_url;
//     }

//     await pool.query(
//       "INSERT INTO admins (id, email, password_hash, role, name, avatar_url) VALUES (?, ?, ?, ?, ?, ?)",
//       [id, email, hash, finalRole, name || null, avatarUrl]
//     );

//     return res.json({ ok: true, id, role: finalRole });
//   } catch (err) {
//     console.error("register err", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// exports.login = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   const { email, password } = req.body;

//   try {
//     const [rows] = await pool.query(
//       "SELECT id, email, password_hash, role, name FROM admins WHERE email = ?",
//       [email]
//     );

//     if (!rows.length) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const user = rows[0];
//     const ok = await bcrypt.compare(password, user.password_hash);
//     if (!ok) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // include a jwtid (jti) for better blacklist handling
//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "8h", jwtid: uuidv4() }
//     );

//     await pool.query("UPDATE admins SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [user.id]);

//     return res.json({
//       token,
//       admin: {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         name: user.name,
//       },
//     });
//   } catch (err) {
//     console.error("Login error", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// exports.me = async (req, res) => {
//   try {
//     const id = req.admin.id;
//     const [rows] = await pool.query(
//       "SELECT id, email, role, name, avatar_url, created_at FROM admins WHERE id = ?",
//       [id]
//     );
//     if (!rows.length) return res.status(404).json({ error: "Not found" });
//     return res.json({ admin: rows[0] });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// exports.createAdmin = async (req, res) => {
//   // protected by requireRole("superadmin") in router
//   const { email, password, role = "admin", name } = req.body;
//   if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

//   try {
//     const [exists] = await pool.query("SELECT id FROM admins WHERE email = ?", [email]);
//     if (exists.length) return res.status(409).json({ error: "Email already exists" });

//     const hash = await bcrypt.hash(password, SALT_ROUNDS);
//     const id = uuidv4();
//     await pool.query(
//       "INSERT INTO admins (id, email, password_hash, role, name) VALUES (?, ?, ?, ?, ?)",
//       [id, email, hash, role, name || null]
//     );
//     return res.json({ ok: true, id });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// exports.listAdmins = async (req, res) => {
//   try {
//     const [rows] = await pool.query(
//       "SELECT id, email, role, name, avatar_url, created_at FROM admins ORDER BY created_at DESC"
//     );
//     return res.json({ admins: rows });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// exports.deleteAdmin = async (req, res) => {
//   const id = req.params.id;
//   try {
//     await pool.query("DELETE FROM admins WHERE id = ?", [id]);
//     return res.json({ ok: true });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// // logout - store token in blacklist
// const jwtDecode = require("jsonwebtoken");

// exports.logout = async (req, res) => {
//   try {
//     const auth = req.headers?.authorization || "";
//     const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
//     if (!token) return res.status(400).json({ error: "No token provided" });

//     const payload = jwtDecode.decode(token) || {};

//     let expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 8);
//     if (payload.exp) expiresAt = new Date(payload.exp * 1000);

//     const jti = payload.jti || payload.jti || null;

//     await pool.query(
//       "INSERT INTO jwt_blacklist (jti, token, expires_at) VALUES (?, ?, ?)",
//       [jti, token, expiresAt]
//     );

//     return res.json({ ok: true, message: "Logged out" });
//   } catch (err) {
//     console.error("logout err", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// // lightweight count endpoint
// exports.countAdminsEndpoint = async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT COUNT(*) AS c FROM admins");
//     const count = Number(rows?.[0]?.c || 0);
//     return res.json({ count });
//   } catch (err) {
//     console.error("countAdmins err", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };


// server/controllers/adminController.js
import { validationResult } from "express-validator";
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../config/cloudinary.js";

const JWT_SECRET = process.env.JWT_SECRET || "replace_this_secret";
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// helper: count admins
async function adminCount() {
  const [rows] = await pool.query("SELECT COUNT(*) as c FROM admins");
  return Number(rows[0]?.c || 0);
}

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password, role = "admin", name } = req.body;

  try {
    const count = await adminCount();
    const finalRole = count === 0 ? "superadmin" : role;
    if (count > 0 && finalRole === "superadmin") {
      return res.status(403).json({ error: "Cannot create superadmin" });
    }

    const [exists] = await pool.query("SELECT id FROM admins WHERE email = ?", [email]);
    if (exists.length) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const id = uuidv4();
    let avatarUrl = null;

    if (req.body?.avatar_url) {
      avatarUrl = req.body.avatar_url;
    } else if (req.file && req.file.buffer && process.env.CLOUDINARY_CLOUD_NAME) {
      const b64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(b64, { folder: "admins" });
      avatarUrl = result.secure_url;
    }

    await pool.query(
      "INSERT INTO admins (id, email, password_hash, role, name, avatar_url) VALUES (?, ?, ?, ?, ?, ?)",
      [id, email, hash, finalRole, name || null, avatarUrl]
    );

       // 🔥 LOG ACTIVITY
    await logActivity({
      actor_type: "admin",
      actor_name: req.user.name,
      action: "created program",
      target_type: "program",
      target_name: title,
    });

    return res.json({ ok: true, id, role: finalRole });
  } catch (err) {
    console.error("register err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT id, email, password_hash, role, name FROM admins WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // include a jwtid (jti) for better blacklist handling
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h", jwtid: uuidv4() }
    );

    await pool.query("UPDATE admins SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", [user.id]);

    return res.json({
      token,
      admin: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function me(req, res) {
  try {
    const id = req.admin?.id;
    if (!id) return res.status(401).json({ error: "Unauthorized" });
    const [rows] = await pool.query(
      "SELECT id, email, role, name, avatar_url, created_at FROM admins WHERE id = ?",
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    return res.json({ admin: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function createAdmin(req, res) {
  // protected by requireRole("superadmin") in router
  const { email, password, role = "admin", name } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

  try {
    const [exists] = await pool.query("SELECT id FROM admins WHERE email = ?", [email]);
    if (exists.length) return res.status(409).json({ error: "Email already exists" });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const id = uuidv4();
    await pool.query(
      "INSERT INTO admins (id, email, password_hash, role, name) VALUES (?, ?, ?, ?, ?)",
      [id, email, hash, role, name || null]
    );
    return res.json({ ok: true, id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

// export async function createAdmin(form) {
//   setCreating(true);
//   const temp = { id: Date.now(), ...form };
//   setAdmins(s => [temp, ...s]);

//   try {
//     // create on server (superadmin only)
//     const res = await api.post("/api/admin/admins", form);
//     const created = res.data?.admin ?? res.data;
//     if (created && created.id) {
//       setAdmins(s => [created, ...s.filter(x => x.id !== temp.id)]);
//     } else {
//       // fallback: refresh list
//       const listRes = await api.get("/api/admin/admins").catch(() => null);
//       if (listRes && listRes.data) {
//         const list = Array.isArray(listRes.data.admins) ? listRes.data.admins : listRes.data;
//         setAdmins(list);
//       }
//     }
//     // update count if endpoint available
//     const cntRes = await api.get("/api/admin/admins/count").catch(() => null);
//     if (cntRes && cntRes.data?.count) {
//       setStats(s => ({ ...s, admins: Number(cntRes.data.count) }));
//     }
//   } catch (err) {
//     console.warn("create admin failed:", err?.message || err);
//     // rollback optimistic
//     setAdmins(s => s.filter(x => x.id !== temp.id));
//     throw err;
//   } finally {
//     setCreating(false);
//     setShowCreateModal(false);
//     setActivity(a => [{ id: Date.now(), text: `Admin ${form.name} created`, time: "just now" }, ...a]);
//   }
// }


export async function listAdmins(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id, email, role, name, avatar_url, created_at FROM admins ORDER BY created_at DESC"
    );
    return res.json({ admins: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function deleteAdmin(req, res) {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM admins WHERE id = ?", [id]);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

// updateAdmin: allows superadmin or self to update fields (name, email, role, avatar_url, password)
export async function updateAdmin(req, res) {
  const id = req.params.id;
  const caller = req.admin;
  if (!caller) return res.status(401).json({ error: "Unauthorized" });

  // Only superadmin can edit other admins; admins can edit self
  if (caller.role !== "superadmin" && caller.id !== id) {
    return res.status(403).json({ error: "Forbidden - insufficient role" });
  }

  const { name, email, role, avatar_url, password } = req.body;
  if (name === undefined && email === undefined && role === undefined && avatar_url === undefined && (password === undefined || password === "")) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  try {
    const updates = [];
    const params = [];

    if (name !== undefined) { updates.push("name = ?"); params.push(name || null); }
    if (email !== undefined) { updates.push("email = ?"); params.push(email); }
    if (avatar_url !== undefined) { updates.push("avatar_url = ?"); params.push(avatar_url || null); }

    // Only allow role change if caller is superadmin
    if (role !== undefined) {
      if (caller.role !== "superadmin") {
        return res.status(403).json({ error: "Only superadmin can change roles" });
      }
      updates.push("role = ?"); params.push(role);
    }

    if (password && password.length >= 6) {
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      updates.push("password_hash = ?");
      params.push(hash);
    }

    if (updates.length === 0) return res.json({ ok: true });

    params.push(id);
    const sql = `UPDATE admins SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    await pool.query(sql, params);

    const [rows] = await pool.query("SELECT id, email, role, name, avatar_url, created_at FROM admins WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });

    return res.json({ admin: rows[0] });
  } catch (err) {
    console.error("updateAdmin err", err);
    if (err?.code === "ER_DUP_ENTRY" || err?.errno === 1062) {
      return res.status(409).json({ error: "Email already exists" });
    }
    return res.status(500).json({ error: "Server error" });
  }
}

export async function logout(req, res) {
  try {
    const auth = req.headers?.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token) return res.status(400).json({ error: "No token provided" });

    const payload = jwt.decode(token) || {};

    let expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 8);
    if (payload.exp) expiresAt = new Date(payload.exp * 1000);

    const jti = payload.jti || null;

    await pool.query(
      "INSERT INTO jwt_blacklist (jti, token, expires_at) VALUES (?, ?, ?)",
      [jti, token, expiresAt]
    );

    return res.json({ ok: true, message: "Logged out" });
  } catch (err) {
    console.error("logout err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// lightweight count endpoint
export async function countAdminsEndpoint(req, res) {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS c FROM admins");
    const count = Number(rows?.[0]?.c || 0);
    return res.json({ count });
  } catch (err) {
    console.error("countAdmins err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../config/cloudinary.js";

function safe(v) {
  return v == null ? null : String(v).trim();
}

/* =========================
   CLOUDINARY HELPER
========================= */
async function uploadCloudinary(buffer, type) {
  const b64 = `data:${type};base64,${buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(b64, {
    folder: "programs",
    transformation: [{ width: 1200, height: 1200, crop: "limit" }],
  });
  return result.secure_url;
}

/* =========================
   PROGRAM COUNT (HELPER)
========================= */
export async function getProgramCount() {
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM programs");
  return Number(rows[0]?.count || 0);
}

/* =========================
   PROGRAM COUNT (API)
========================= */
export async function programCount(req, res) {
  try {
    const count = await getProgramCount();
    res.json({ count });
  } catch (err) {
    console.error("programCount error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

/* =========================
   LIST PROGRAMS
========================= */
// export async function listPrograms(req, res) {
//   try {
//     const [rows] = await pool.query(
//       "SELECT id, title, description, image_url, created_at FROM programs ORDER BY created_at DESC"
//     );
//     res.json({ programs: rows });
//   } catch (err) {
//     console.error("listPrograms err", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

export async function listPrograms(req, res) {
  try {
    const limit = Number(req.query.limit) || null;

    let sql =
      "SELECT id, title, description, image_url, created_at FROM programs ORDER BY created_at DESC";
    let params = [];

    if (limit) {
      sql += " LIMIT ?";
      params.push(limit);
    }

    const [rows] = await pool.query(sql, params);
    res.json({ programs: rows });
  } catch (err) {
    console.error("listPrograms err", err);
    res.status(500).json({ error: "Server error" });
  }
}


/* =========================
   GET SINGLE PROGRAM
========================= */
export async function getProgram(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, description, image_url FROM programs WHERE id = ? LIMIT 1",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Program not found" });
    }

    res.json({ program: rows[0] });
  } catch (err) {
    console.error("getProgram err", err);
    res.status(500).json({ error: "Server error" });
  }
}

/* =========================
   CREATE PROGRAM
========================= */
// export async function createProgram(req, res) {
//   try {
//     const id = uuidv4();
//     const title = safe(req.body.title);
//     const description = safe(req.body.description);

//     if (!title) {
//       return res.status(400).json({ error: "Title is required" });
//     }

//     let image_url = null;
//     if (req.file?.buffer) {
//       image_url = await uploadCloudinary(req.file.buffer, req.file.mimetype);
//     }

//     await pool.query(
//       "INSERT INTO programs (id, title, description, image_url) VALUES (?, ?, ?, ?)",
//       [id, title, description, image_url]
//     );

//     const [rows] = await pool.query(
//       "SELECT id, title, description, image_url FROM programs WHERE id = ?",
//       [id]
//     );

//     res.status(201).json({ program: rows[0] });
//   } catch (err) {
//     console.error("createProgram err", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }


export async function createProgram(req, res) {
  try {
    const id = uuidv4();
    const title = safe(req.body.title);
    const description = safe(req.body.description);

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    let image_url = null;
    if (req.file?.buffer) {
      image_url = await uploadCloudinary(req.file.buffer, req.file.mimetype);
    }

    await pool.query(
      "INSERT INTO programs (id, title, description, image_url) VALUES (?, ?, ?, ?)",
      [id, title, description, image_url]
    );

    // // 🔥 LOG ACTIVITY
    // await logActivity({
    //   actor_type: "admin",
    //   actor_name: req.user.name,
    //   action: "created program",
    //   target_type: "program",
    //   target_name: title,
    // });

    const [rows] = await pool.query(
      "SELECT id, title, description, image_url FROM programs WHERE id = ?",
      [id]
    );

    res.status(201).json({ program: rows[0] });
  } catch (err) {
    console.error("createProgram err", err);
    res.status(500).json({ error: "Server error" });
  }
}


/* =========================
   UPDATE PROGRAM
========================= */
export async function updateProgram(req, res) {
  try {
    const id = req.params.id;
    const title = safe(req.body.title);
    const description = safe(req.body.description);

    const [existing] = await pool.query(
      "SELECT image_url FROM programs WHERE id = ? LIMIT 1",
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({ error: "Program not found" });
    }

    let image_url = existing[0].image_url;

    if (req.file?.buffer) {
      image_url = await uploadCloudinary(req.file.buffer, req.file.mimetype);
    }

    await pool.query(
      "UPDATE programs SET title=?, description=?, image_url=? WHERE id=?",
      [title, description, image_url, id]
    );

    const [rows] = await pool.query(
      "SELECT id, title, description, image_url FROM programs WHERE id = ?",
      [id]
    );

    res.json({ program: rows[0] });
  } catch (err) {
    console.error("updateProgram err", err);
    res.status(500).json({ error: "Server error" });
  }
}

/* =========================
   DELETE PROGRAM
========================= */
export async function deleteProgram(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id FROM programs WHERE id = ?",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Program not found" });
    }

    await pool.query("DELETE FROM programs WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error("deleteProgram err", err);
    res.status(500).json({ error: "Server error" });
  }
}

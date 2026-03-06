import pool from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

function safe(v) {
  return v == null ? null : String(v).trim();
}

async function uploadCloudinary(buffer, type) {
  const b64 = `data:${type};base64,${buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(b64, {
    folder: "news",
  });
  return result.secure_url;
}

/* COUNT */
export async function newsCount(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS count FROM news"
    );
    res.json({ count: rows[0].count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* LIST WITH FILTER */
export async function listNews(req, res) {
  try {
    const { type, featured } = req.query;

    let sql = "SELECT * FROM news WHERE status='published'";
    const params = [];

    if (type && type !== "all") {
      sql += " AND type=?";
      params.push(type);
    }

    if (featured === "1") {
      sql += " AND is_featured=1";
    }

    sql += " ORDER BY created_at DESC";

    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* GET ONE */
export async function getNews(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM news WHERE id=?",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* CREATE */
export async function createNews(req, res) {
  try {
    const title = safe(req.body.title);
    const content = safe(req.body.content);
    const author = safe(req.body.author) || "Admin";
    const type = safe(req.body.type) || "news";
    const status = safe(req.body.status) || "published";
    const is_featured = Number(req.body.is_featured) || 0;

    let image_url = null;

    if (req.file) {
      image_url = await uploadCloudinary(
        req.file.buffer,
        req.file.mimetype
      );
    }

    const [result] = await pool.query(
      `
      INSERT INTO news
      (title, content, image_url, author, is_featured, status, type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [title, content, image_url, author, is_featured, status, type]
    );

    const [rows] = await pool.query(
      "SELECT * FROM news WHERE id=?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* UPDATE */
export async function updateNews(req, res) {
  try {
    const id = req.params.id;

    const [existing] = await pool.query(
      "SELECT image_url FROM news WHERE id=?",
      [id]
    );

    if (!existing.length) {
      return res.status(404).json({ error: "Not found" });
    }

    let image_url = existing[0].image_url;

    if (req.file) {
      image_url = await uploadCloudinary(
        req.file.buffer,
        req.file.mimetype
      );
    }

    await pool.query(
      `
      UPDATE news SET
      title=?, content=?, image_url=?, author=?, 
      is_featured=?, status=?, type=?
      WHERE id=?
      `,
      [
        req.body.title,
        req.body.content,
        image_url,
        req.body.author,
        req.body.is_featured,
        req.body.status,
        req.body.type,
        id,
      ]
    );

    const [rows] = await pool.query(
      "SELECT * FROM news WHERE id=?",
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* DELETE */
export async function deleteNews(req, res) {
  try {
    await pool.query("DELETE FROM news WHERE id=?", [
      req.params.id,
    ]);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



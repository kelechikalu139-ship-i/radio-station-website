// server/controllers/sponsorsController.js
import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../config/cloudinary.js";

async function uploadToCloudinary(buffer, mimetype, folder) {
  const b64 = `data:${mimetype};base64,${buffer.toString("base64")}`;
  const res = await cloudinary.uploader.upload(b64, { folder, resource_type: "image" });
  return res.secure_url;
}

export async function listSponsors(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM sponsors ORDER BY display_order ASC, created_at DESC");
    res.json({ sponsors: rows });
  } catch (err) {
    console.error("listSponsors", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getSponsor(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM sponsors WHERE id = ? LIMIT 1", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json({ sponsor: rows[0] });
  } catch (err) {
    console.error("getSponsor", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createSponsor(req, res) {
  try {
    const id = uuidv4();
    const { name, description, website, display_order = 0, active = 1 } = req.body;
    if (!name) return res.status(400).json({ error: "Name required" });

    let logo_url = null;
    if (req.file && req.file.buffer) {
      logo_url = await uploadToCloudinary(req.file.buffer, req.file.mimetype, "sponsors");
    }

    await pool.query(
      "INSERT INTO sponsors (id, name, description, website, logo_url, display_order, active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, name, description || null, website || null, logo_url, Number(display_order) || 0, active ? 1 : 0]
    );

    const [rows] = await pool.query("SELECT * FROM sponsors WHERE id = ? LIMIT 1", [id]);
    res.status(201).json({ sponsor: rows[0] });
  } catch (err) {
    console.error("createSponsor", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function updateSponsor(req, res) {
  try {
    const id = req.params.id;
    const { name, description, website, display_order = 0, active = 1 } = req.body;
    const [existing] = await pool.query("SELECT * FROM sponsors WHERE id = ? LIMIT 1", [id]);
    if (!existing.length) return res.status(404).json({ error: "Not found" });

    let logo_url = existing[0].logo_url;
    if (req.file && req.file.buffer) {
      logo_url = await uploadToCloudinary(req.file.buffer, req.file.mimetype, "sponsors");
    }

    await pool.query(
      "UPDATE sponsors SET name = ?, description = ?, website = ?, logo_url = ?, display_order = ?, active = ? WHERE id = ?",
      [name || existing[0].name, description || existing[0].description, website || existing[0].website, logo_url, Number(display_order) || 0, active ? 1 : 0, id]
    );

       // 🔥 LOG ACTIVITY
    await logActivity({
      actor_type: "admin",
      actor_name: req.user.name,
      action: "created program",
      target_type: "program",
      target_name: title,
    });

    const [rows] = await pool.query("SELECT * FROM sponsors WHERE id = ? LIMIT 1", [id]);
    res.json({ sponsor: rows[0] });
  } catch (err) {
    console.error("updateSponsor", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteSponsor(req, res) {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM sponsors WHERE id = ?", [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error("deleteSponsor", err);
    res.status(500).json({ error: "Server error" });
  }
}

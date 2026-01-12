// server/controllers/episodesController.js
import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../config/cloudinary.js";

async function uploadToCloudinary(buffer, mimetype, folder) {
  const b64 = `data:${mimetype};base64,${buffer.toString("base64")}`;
  const res = await cloudinary.uploader.upload(b64, { folder, resource_type: mimetype.startsWith("audio/") ? "video" : "image" });
  return res.secure_url;
}

export async function listEpisodes(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT e.id, e.program_id, e.title, e.description, e.audio_url, e.cover_url, e.duration_seconds, e.created_at,
              p.title AS program_title
       FROM episodes e
       LEFT JOIN programs p ON p.id = e.program_id
       ORDER BY e.created_at DESC`
    );
    res.json({ episodes: rows });
  } catch (err) {
    console.error("listEpisodes", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getEpisode(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM episodes WHERE id = ? LIMIT 1", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json({ episode: rows[0] });
  } catch (err) {
    console.error("getEpisode", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function createEpisode(req, res) {
  try {
    const id = uuidv4();
    const { title, description, program_id } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });

    let audio_url = null;
    let cover_url = null;
    let duration_seconds = null;

    if (req.files) {
      // allow both 'audio' and 'cover' fields
      if (req.files.audio && req.files.audio[0]) {
        audio_url = await uploadToCloudinary(req.files.audio[0].buffer, req.files.audio[0].mimetype, "episodes/audio");
        // Not extracting audio duration server-side here; optional to add
      }
      if (req.files.cover && req.files.cover[0]) {
        cover_url = await uploadToCloudinary(req.files.cover[0].buffer, req.files.cover[0].mimetype, "episodes/covers");
      }
    }

    await pool.query(
      "INSERT INTO episodes (id, program_id, title, description, audio_url, cover_url, duration_seconds) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, program_id || null, title, description || null, audio_url, cover_url, duration_seconds]
    );

    const [rows] = await pool.query("SELECT * FROM episodes WHERE id = ? LIMIT 1", [id]);
    res.status(201).json({ episode: rows[0] });
  } catch (err) {
    console.error("createEpisode", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function updateEpisode(req, res) {
  try {
    const id = req.params.id;
    const { title, description, program_id } = req.body;
    const [existing] = await pool.query("SELECT * FROM episodes WHERE id = ? LIMIT 1", [id]);
    if (!existing.length) return res.status(404).json({ error: "Not found" });

    let audio_url = existing[0].audio_url;
    let cover_url = existing[0].cover_url;

    if (req.files) {
      if (req.files.audio && req.files.audio[0]) {
        audio_url = await uploadToCloudinary(req.files.audio[0].buffer, req.files.audio[0].mimetype, "episodes/audio");
      }
      if (req.files.cover && req.files.cover[0]) {
        cover_url = await uploadToCloudinary(req.files.cover[0].buffer, req.files.cover[0].mimetype, "episodes/covers");
      }
    }

    await pool.query(
      "UPDATE episodes SET program_id = ?, title = ?, description = ?, audio_url = ?, cover_url = ? WHERE id = ?",
      [program_id || null, title || existing[0].title, description || existing[0].description, audio_url, cover_url, id]
    );

    const [rows] = await pool.query("SELECT * FROM episodes WHERE id = ? LIMIT 1", [id]);
    res.json({ episode: rows[0] });
  } catch (err) {
    console.error("updateEpisode", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteEpisode(req, res) {
  try {
    const id = req.params.id;
    await pool.query("DELETE FROM episodes WHERE id = ?", [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error("deleteEpisode", err);
    res.status(500).json({ error: "Server error" });
  }
}

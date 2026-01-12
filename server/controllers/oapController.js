// server/controllers/oapController.js (ESM)
import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../config/cloudinary.js";

/**
 * Expected: route will be mounted under /api/admin (so endpoints become
 * GET  /api/admin/oaps
 * POST /api/admin/oaps         (multipart/form-data, field 'avatar')
 * GET  /api/admin/oaps/:id
 * PUT  /api/admin/oaps/:id     (multipart/form-data optional 'avatar')
 * DELETE /api/admin/oaps/:id  
 */

function safeStr(v) {
  return v == null ? null : String(v).trim();
}

export async function getOapCount() {
  const [rows] = await pool.query("SELECT COUNT(*) AS count from oaps");
  return Number(rows[0]?.count || 0);
}

export async function oapCount(req, res) {
  try {
    const count = await getOapCount();
    res.json({ count });
  } catch (err) {
    console.error("oapCount error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function listOAPs(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, bio, twitter, instagram, facebook, image_url, created_at, updated_at FROM oaps ORDER BY created_at DESC"
    );
    return res.json({ oaps: rows });
  } catch (err) {
    console.error("listOAPs err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function getOAP(req, res) {
  const id = req.params.id;
  try {
    const [rows] = await pool.query(
      "SELECT id, name, bio, twitter, instagram, facebook, image_url, created_at, updated_at FROM oaps WHERE id = ? LIMIT 1",
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    return res.json({ oap: rows[0] });
  } catch (err) {
    console.error("getOAP err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function uploadToCloudinary(fileBuffer, mimetype, publicIdPrefix = "oaps") {
  // returns secure_url
  const b64 = `data:${mimetype};base64,${fileBuffer.toString("base64")}`;
  const res = await cloudinary.uploader.upload(b64, {
    folder: publicIdPrefix,
    transformation: [{ width: 1200, height: 1200, crop: "limit" }],
    resource_type: "image",
  });
  return res.secure_url;
}

export async function createOAP(req, res) {
  try {
    const id = uuidv4();
    const name = safeStr(req.body.name);
    if (!name) return res.status(400).json({ error: "Name is required" });

    const bio = safeStr(req.body.bio);
    const twitter = safeStr(req.body.twitter);
    const instagram = safeStr(req.body.instagram);
    const facebook = safeStr(req.body.facebook);

    let image_url = null;
    if (req.file && req.file.buffer) {
      try {
        image_url = await uploadToCloudinary(req.file.buffer, req.file.mimetype, "oaps");
      } catch (uerr) {
        console.error("cloudinary upload err", uerr);
        // continue without failing — optional: return error
        return res.status(500).json({ error: "Image upload failed" });
      }
    } else if (req.body?.image_url) {
      image_url = safeStr(req.body.image_url);
    }

    await pool.query(
      "INSERT INTO oaps (id, name, bio, twitter, instagram, facebook, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, name, bio, twitter, instagram, facebook, image_url]
    );


    //    // 🔥 LOG ACTIVITY
    // await logActivity({
    //   actor_type: "admin",
    //   actor_name: req.user.name,
    //   action: "created program",
    //   target_type: "program",
    //   target_name: title,
    // });

    const [rows] = await pool.query("SELECT id, name, bio, twitter, instagram, facebook, image_url, created_at FROM oaps WHERE id = ? LIMIT 1", [id]);
    const oap = rows[0];
    return res.status(201).json({ oap });
  } catch (err) {
    console.error("createOAP err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function updateOAP(req, res) {
  try {
    const id = req.params.id;
    const name = safeStr(req.body.name);
    if (!name) return res.status(400).json({ error: "Name is required" });

    const bio = safeStr(req.body.bio);
    const twitter = safeStr(req.body.twitter);
    const instagram = safeStr(req.body.instagram);
    const facebook = safeStr(req.body.facebook);

    // existing record check
    const [existing] = await pool.query("SELECT id, image_url FROM oaps WHERE id = ? LIMIT 1", [id]);
    if (!existing.length) return res.status(404).json({ error: "Not found" });

    let image_url = existing[0].image_url;

    if (req.file && req.file.buffer) {
      try {
        image_url = await uploadToCloudinary(req.file.buffer, req.file.mimetype, "oaps");
      } catch (uerr) {
        console.error("cloudinary upload err", uerr);
        return res.status(500).json({ error: "Image upload failed" });
      }
    } else if (req.body?.image_url) {
      image_url = safeStr(req.body.image_url);
    }

    await pool.query(
      "UPDATE oaps SET name = ?, bio = ?, twitter = ?, instagram = ?, facebook = ?, image_url = ? WHERE id = ?",
      [name, bio, twitter, instagram, facebook, image_url, id]
    );

    const [rows] = await pool.query("SELECT id, name, bio, twitter, instagram, facebook, image_url, updated_at FROM oaps WHERE id = ? LIMIT 1", [id]);
    const oap = rows[0];
    return res.json({ oap });
  } catch (err) {
    console.error("updateOAP err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function deleteOAP(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT id FROM oaps WHERE id = ? LIMIT 1", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });

    await pool.query("DELETE FROM oaps WHERE id = ?", [id]);
    return res.json({ ok: true });
  } catch (err) {
    console.error("deleteOAP err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

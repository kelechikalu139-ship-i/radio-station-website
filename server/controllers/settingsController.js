// server/controllers/settingsController.js
import pool from "../config/db.js";

export async function listSettings(req, res) {
  try {
    const [rows] = await pool.query("SELECT `key`, `value` FROM settings");
    const obj = {};
    for (const r of rows) obj[r.key] = r.value;
    res.json({ settings: obj });
  } catch (err) {
    console.error("listSettings", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getSetting(req, res) {
  try {
    const key = req.params.key;
    const [rows] = await pool.query("SELECT `value` FROM settings WHERE `key` = ? LIMIT 1", [key]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json({ key, value: rows[0].value });
  } catch (err) {
    console.error("getSetting", err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function upsertSetting(req, res) {
  try {
    const key = req.params.key;
    const { value } = req.body;
    if (typeof value === "undefined") return res.status(400).json({ error: "value required" });

    await pool.query("INSERT INTO settings (`key`,`value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), updated_at = CURRENT_TIMESTAMP", [key, value]);
    res.json({ ok: true, key, value });

       // 🔥 LOG ACTIVITY
    await logActivity({
      actor_type: "admin",
      actor_name: req.user.name,
      action: "created program",
      target_type: "program",
      target_name: title,
    });
  } catch (err) {
    console.error("upsertSetting", err);
    res.status(500).json({ error: "Server error" });
  }
}

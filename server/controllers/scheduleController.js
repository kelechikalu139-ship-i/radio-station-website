// server/controllers/scheduleController.js
import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Routes:
 * GET    /api/admin/schedules            -> list schedules (with joined program/oap details)
 * GET    /api/admin/schedules/:id        -> single schedule
 * POST   /api/admin/schedules            -> create (body: program_id, oap_id, start_at, end_at, notes)
 * PUT    /api/admin/schedules/:id        -> update
 * DELETE /api/admin/schedules/:id        -> delete
 */

export async function getScheduleCount() {
  const [rows] = await pool.query("SELECT COUNT (*) AS count FROM schedules");
  return Number(rows[0]?.count || 0);
}

export async function scheduleCount(req, res) {
  try {
    const count = await getScheduleCount();
    res.json({count});
  } catch (err) {
    console.error("ScheduleCount error:", err);
    res.status(500).json({error: "Server error"});
  }
}

function parseDateInput(v) {
  // expects ISO-ish string from datetime-local inputs like "2025-12-05T15:00"
  if (!v) return null;
  // server expects 'YYYY-MM-DD HH:MM:SS'
  const dt = new Date(v);
  if (isNaN(dt)) return null;
  // format to MySQL DATETIME (YYYY-MM-DD HH:MM:SS)
  const y = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  const hh = String(dt.getHours()).padStart(2, "0");
  const mi = String(dt.getMinutes()).padStart(2, "0");
  const ss = String(dt.getSeconds()).padStart(2, "0");
  return `${y}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

export async function listSchedules(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT s.id, s.program_id, s.oap_id, s.start_at, s.end_at, s.notes, s.created_at,
              p.title AS program_title, p.image_url AS program_image,
              o.name AS oap_name, o.image_url AS oap_image
       FROM schedules s
       LEFT JOIN programs p ON p.id = s.program_id
       LEFT JOIN oaps o ON o.id = s.oap_id
       ORDER BY s.start_at DESC`
    );
    return res.json({ schedules: rows });
  } catch (err) {
    console.error("listSchedules err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function getSchedule(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await pool.query(
      `SELECT s.*, p.title AS program_title, o.name AS oap_name
       FROM schedules s
       LEFT JOIN programs p ON p.id = s.program_id
       LEFT JOIN oaps o ON o.id = s.oap_id
       WHERE s.id = ? LIMIT 1`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    return res.json({ schedule: rows[0] });
  } catch (err) {
    console.error("getSchedule err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

function validateTimes(start, end) {
  if (!start || !end) return "Start and end are required";
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s) || isNaN(e)) return "Invalid date/time";
  if (s >= e) return "End time must be after start time";
  return null;
}

export async function createSchedule(req, res) {
  try {
    const { program_id, oap_id, start_at, end_at, notes } = req.body;
    if (!program_id || !oap_id) return res.status(400).json({ error: "program_id and oap_id required" });

    const validationMsg = validateTimes(start_at, end_at);
    if (validationMsg) return res.status(400).json({ error: validationMsg });

    const startDT = parseDateInput(start_at);
    const endDT = parseDateInput(end_at);
    const id = uuidv4();

    await pool.query(
      "INSERT INTO schedules (id, program_id, oap_id, start_at, end_at, notes) VALUES (?, ?, ?, ?, ?, ?)",
      [id, program_id, oap_id, startDT, endDT, notes || null]
    );

    //    // 🔥 LOG ACTIVITY
    // await logActivity({
    //   actor_type: "admin",
    //   actor_name: req.user.name,
    //   action: "created program",
    //   target_type: "program",
    //   target_name: title,
    // });

    const [rows] = await pool.query(
      `SELECT s.id, s.program_id, s.oap_id, s.start_at, s.end_at, s.notes,
              p.title AS program_title, o.name AS oap_name
       FROM schedules s
       LEFT JOIN programs p ON p.id = s.program_id
       LEFT JOIN oaps o ON o.id = s.oap_id
       WHERE s.id = ? LIMIT 1`,
      [id]
    );

    return res.status(201).json({ schedule: rows[0] });
  } catch (err) {
    console.error("createSchedule err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function updateSchedule(req, res) {
  try {
    const id = req.params.id;
    const { program_id, oap_id, start_at, end_at, notes } = req.body;

    if (!program_id || !oap_id) return res.status(400).json({ error: "program_id and oap_id required" });

    const validationMsg = validateTimes(start_at, end_at);
    if (validationMsg) return res.status(400).json({ error: validationMsg });

    const startDT = parseDateInput(start_at);
    const endDT = parseDateInput(end_at);

    const [existing] = await pool.query("SELECT id FROM schedules WHERE id = ? LIMIT 1", [id]);
    if (!existing.length) return res.status(404).json({ error: "Not found" });

    await pool.query(
      "UPDATE schedules SET program_id = ?, oap_id = ?, start_at = ?, end_at = ?, notes = ? WHERE id = ?",
      [program_id, oap_id, startDT, endDT, notes || null, id]
    );

    const [rows] = await pool.query(
      `SELECT s.id, s.program_id, s.oap_id, s.start_at, s.end_at, s.notes,
              p.title AS program_title, o.name AS oap_name
       FROM schedules s
       LEFT JOIN programs p ON p.id = s.program_id
       LEFT JOIN oaps o ON o.id = s.oap_id
       WHERE s.id = ? LIMIT 1`,
      [id]
    );

    return res.json({ schedule: rows[0] });
  } catch (err) {
    console.error("updateSchedule err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function deleteSchedule(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT id FROM schedules WHERE id = ? LIMIT 1", [id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });

    await pool.query("DELETE FROM schedules WHERE id = ?", [id]);
    return res.json({ ok: true });
  } catch (err) {
    console.error("deleteSchedule err", err);
    return res.status(500).json({ error: "Server error" });
  }
}

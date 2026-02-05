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


// Public Api 

// amybe later i will put it a a seperate file publicScheduleController.js

export async function getLiveProgram(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id, p.title, p.description, p.image_url,
        o.name AS host_name, o.image_url AS host_image,
        s.start_at, s.end_at
      FROM schedules s
      INNER JOIN programs p ON p.id = s.program_id
      INNER JOIN oaps o ON o.id = s.oap_id
      WHERE s.start_at <= NOW() 
        AND s.end_at > NOW()
      ORDER BY s.start_at DESC
      LIMIT 1
    `);

    if (rows.length === 0) {
      return res.json({ live: null });
    }

    res.json({ live: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// export async function getNextProgram(req, res) {
//   try {
//     const [rows] = await pool.query(`
//       SELECT 
//         p.id, p.title, p.description, p.image_url,
//         o.name AS host_name, o.image_url AS host_image,
//         s.start_at, s.end_at
//       FROM schedules s
//       INNER JOIN programs p ON p.id = s.program_id
//       INNER JOIN oaps o ON o.id = s.oap_id
//       WHERE s.start_at > NOW()
//       ORDER BY s.start_at ASC
//       LIMIT 1
//     `);

//     if (rows.length === 0) {
//       return res.json({ next: null });
//     }

//     res.json({ next: rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

export async function getNextProgram(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id, p.title, p.description, p.image_url,
        o.name AS host_name, o.image_url AS host_image,
        s.start_at, s.end_at
      FROM schedules s
      INNER JOIN programs p ON p.id = s.program_id
      INNER JOIN oaps o ON o.id = s.oap_id
      WHERE s.start_at > NOW()
      ORDER BY s.start_at ASC
      LIMIT 3
    `);

    res.json({
      next: rows[0] || null,
      later: rows.slice(1) || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}


// For full schedule (e.g. today or week)
export async function getTodaySchedule(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        DAYNAME(s.start_at) AS day,
        p.title, p.description,
        o.name AS host,
        TIME_FORMAT(s.start_at, '%H:%i') AS start_time,
        TIME_FORMAT(s.end_at, '%H:%i') AS end_time,
        s.start_at
      FROM schedules s
      INNER JOIN programs p ON p.id = s.program_id
      INNER JOIN oaps o ON o.id = s.oap_id
      WHERE DATE(s.start_at) = CURDATE()
      ORDER BY s.start_at ASC
    `);

    res.json({ today: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}



export async function getWeeklySchedule(req, res) {
  try {

   const [rows] = await pool.query(`
  SELECT 
    DAYNAME(s.start_at) AS day,
    p.title,
    o.name AS host,
    TIME_FORMAT(s.start_at, '%H:%i') AS start_time,
    TIME_FORMAT(s.end_at, '%H:%i') AS end_time,
    COALESCE(p.description,'') AS description
  FROM schedules s
  INNER JOIN programs p ON p.id = s.program_id
  INNER JOIN oaps o ON o.id = s.oap_id
  WHERE s.start_at IS NOT NULL
  ORDER BY 
    FIELD(DAYNAME(s.start_at),
      'Monday','Tuesday','Wednesday',
      'Thursday','Friday','Saturday','Sunday'
    ),
    s.start_at ASC
`);


    const byDay = {};

    rows.forEach(row => {

      if (!row.day) return;

      if (!byDay[row.day]) {
        byDay[row.day] = [];
      }

      byDay[row.day].push({
  title: row.title,
  host: row.host,
  desc: row.description,
  start_time: row.start_time,
  end_time: row.end_time
});


    });

    res.json({ schedule: byDay });

  } catch (err) {
    console.error("🔥 Weekly Schedule Error:", err); // VERY IMPORTANT
    res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}

// import db from "../config/db.js";

// export const getRecentActivity = async (req, res) => {
//   const limit = Number(req.query.limit || 10);

//   const [rows] = await db.query(
//     "SELECT id, message, created_at FROM activity_logs ORDER BY created_at DESC LIMIT ?",
//     [limit]
//   );

//   res.json({ activity: rows });
// };


import pool from "../config/db.js";

export const getRecentActivity = async (req, res) => {
  try {
    const limit = Number(req.query.limit || 10);

    const [rows] = await pool.query(
      `
      (
        SELECT 
          'admin' AS type,
          CONCAT('Admin ', name, ' created an account') AS text,
          created_at AS time
        FROM admins
      )
      UNION ALL
      (
        SELECT 
          'program' AS type,
          CONCAT('Program "', title, '" was created') AS text,
          created_at AS time
        FROM programs
      )
      UNION ALL
      (
        SELECT 
          'oap' AS type,
          CONCAT('OAP ', name, ' was added') AS text,
          created_at AS time
        FROM oaps
      )
      UNION ALL
      (
        SELECT 
          'schedule' AS type,
          CONCAT('Program schedule updated') AS text,
          created_at AS time
        FROM schedules
      )
      ORDER BY time DESC
      LIMIT ?
      `,
      [limit]
    );

    res.json(rows);
  } catch (err) {
    console.error("Activity error:", err);
    res.status(500).json({ message: "Failed to load activity" });
  }
};


export const getAllActivityLog = async(req, res)=>{
  try {
    const [rows] = pool.query(
      `
        (
        SELECT 
          'admin' AS type,
          CONCAT('Admin ', name, ' created an account') AS text,
          created_at AS time
        FROM admins
      )
      UNION ALL
      (
        SELECT 
          'program' AS type,
          CONCAT('Program "', title, '" was created') AS text,
          created_at AS time
        FROM programs
      )
      UNION ALL
      (
        SELECT 
          'oap' AS type,
          CONCAT('OAP ', name, ' was added') AS text,
          created_at AS time
        FROM oaps
      )
      UNION ALL
      (
        SELECT 
          'schedule' AS type,
          CONCAT('Program schedule updated') AS text,
          created_at AS time
        FROM schedules
      )
      ORDER BY time DESC
      
      `
    )
  } catch (err) {
    
  }
}
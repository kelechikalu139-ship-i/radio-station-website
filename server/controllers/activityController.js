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





// export const getAllActivityLog = async (req, res) => {
//   try {
//     const page = Number(req.query.page || 1);
//     const limit = Number(req.query.limit || 10);
//     const offset = (page - 1) * limit;
//     const type = req.query.type || "all";
//     const search = req.query.search || "";

//     let whereClause = "WHERE 1=1";
//     const params = [];

//     if (type !== "all") {
//       whereClause += " AND type = ?";
//       params.push(type);
//     }

//     if (search) {
//       whereClause += " AND text LIKE ?";
//       params.push(`%${search}%`);
//     }

//     const baseQuery = `
//       SELECT * FROM (
//         SELECT 
//           'admin' AS type,
//           CONCAT('Admin ', name, ' created an account') AS text,
//           created_at AS time
//         FROM admins

//         UNION ALL

//         SELECT 
//           'program' AS type,
//           CONCAT('Program "', title, '" was created') AS text,
//           created_at AS time
//         FROM programs

//         UNION ALL

//         SELECT 
//           'oap' AS type,
//           CONCAT('OAP ', name, ' was added') AS text,
//           created_at AS time
//         FROM oaps

//         UNION ALL

//         SELECT 
//           'schedule' AS type,
//           'Program schedule updated' AS text,
//           created_at AS time
//         FROM schedules
//       ) activities
//       ${whereClause}
//     `;

//     const [countRows] = await pool.query(
//       `SELECT COUNT(*) as total FROM (${baseQuery}) x`,
//       params
//     );

//     const total = countRows[0].total;

//     const [rows] = await pool.query(
//       `
//         ${baseQuery}
//         ORDER BY time DESC
//         LIMIT ? OFFSET ?
//       `,
//       [...params, limit, offset]
//     );

//     res.json({
//       data: rows,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (err) {
//     console.error("Activity error:", err);
//     res.status(500).json({ message: "Failed to load activity log" });
//   }
// };


// export const getAllActivityLog = async(req, res) =>{
//   try{
//     const page = Number(req.query.page || 1);
//     const limit = Number(req,res.limit || 10);

//     const offset = (page -1) * limit;
//     const type = req.query.type || "all";
//     const search = req.query.search || "";

//     let whereClause = "WHERE 1=1";
//     const params = [];

//     if(type !== "all"){
//       whereClause += "AND type = ?";
//       params.push(`%${search}%`);
//     }

//     if(search){
//       whereClause += "AND text LIKE ?";
//       params.push(`%${search}%`);
//     }

//     const unionQuery = `
//       SELECT 'admin' AS type,
//       CONCAT('Admin', name, 'created and account') AS text, created_at AS time FROM admins
      
//       UNION ALL

//       SELECT 'program' AS type, CONCAT('Program', title, 'was created') AS text, created_at AS time from programs
      
//       UNION ALL

//       SELECT 'opa'AS type, CONCAT('OAP' name, 'was added') AS text, created_at AS time FROM oaps

//       UNION ALL

//       SELECT 'schedule' AS type, 'Program schedule updated' AS text, created_at AS time FROM schedules`;

//       const finalQuery = `
//       SELECT * FROM (${unionQuery})
//       activities ${whereClause}`;

//       // COUNT 
//       const [countRows] = await pool.query(`SELECT COUNT(*) AS total FROM (${finalQuery}) x`, params);

//       const total = countRows[0].total;

//       // DATA
//       const [rows] = await pool.query(`${finalQuery} ORDER BY time DESC LIMIT ? OFFSET ?`,
//         [...params, limit, offset]
//       );

//       res.json({
//         data:rows,
//         pagination: {
//           total,
//           page,
//           limit,
//           totalPages: Math.ceil(total / limit)
//         }
//       });
//   }catch(err){
//     console.error("Activity error:", err);
//     res.status(500).json({message: "Failed to load activity log"})
//   }
// };


export const getAllActivityLog = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;

    const type = req.query.type || "all";
    const search = req.query.search || "";

    let whereClause = "WHERE 1=1";
    const params = [];

    if (type !== "all") {
      whereClause += " AND type = ?";
      params.push(type);
    }

    if (search) {
      whereClause += " AND text LIKE ?";
      params.push(`%${search}%`);
    }

    const unionQuery = `
      SELECT 'admin' AS type,
        CONCAT('Admin ', name, ' created an account') AS text,
        created_at AS time
      FROM admins

      UNION ALL

      SELECT 'program' AS type,
        CONCAT('Program "', title, '" was created') AS text,
        created_at AS time
      FROM programs

      UNION ALL

      SELECT 'oap' AS type,
        CONCAT('OAP ', name, ' was added') AS text,
        created_at AS time
      FROM oaps

      UNION ALL

      SELECT 'schedule' AS type,
        'Program schedule updated' AS text,
        created_at AS time
      FROM schedules
    `;

    const baseQuery = `
      SELECT * FROM (${unionQuery}) activities
      ${whereClause}
    `;

    // COUNT
    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total FROM (${baseQuery}) x`,
      params
    );

    const total = countRows[0].total;

    // DATA
    const [rows] = await pool.query(
      `
        ${baseQuery}
        ORDER BY time DESC
        LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    );

    res.json({
      data: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (err) {
    console.error("Activity error:", err);
    res.status(500).json({ message: "Failed to load activity log" });
  }
};

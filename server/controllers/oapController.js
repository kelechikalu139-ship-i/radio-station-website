// // server/controllers/oapController.js (ESM)
// import pool from "../config/db.js";
// import { v4 as uuidv4 } from "uuid";
// import cloudinary from "../config/cloudinary.js";
// import streamifier from "streamifier";

// /**
//  * Expected: route will be mounted under /api/admin (so endpoints become
//  * GET  /api/admin/oaps
//  * POST /api/admin/oaps         (multipart/form-data, field 'avatar')
//  * GET  /api/admin/oaps/:id
//  * PUT  /api/admin/oaps/:id     (multipart/form-data optional 'avatar')
//  * DELETE /api/admin/oaps/:id  
//  */

// function safeStr(v) {
//   return v == null ? null : String(v).trim();
// }

// export async function getOapCount() {
//   const [rows] = await pool.query("SELECT COUNT(*) AS count from oaps");
//   return Number(rows[0]?.count || 0);
// }

// export async function oapCount(req, res) {
//   try {
//     const count = await getOapCount();
//     res.json({ count });
//   } catch (err) {
//     console.error("oapCount error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// export async function listOAPs(req, res) {
//   try {
//     const [rows] = await pool.query(
//       "SELECT id, name, bio, twitter, instagram, facebook, image_url, created_at, updated_at FROM oaps ORDER BY created_at DESC"
//     );
//     return res.json({ oaps: rows });
//   } catch (err) {
//     console.error("listOAPs err", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// export async function getOAP(req, res) {
//   const id = req.params.id;
//   try {
//     const [rows] = await pool.query(
//       "SELECT id, name, bio, twitter, instagram, facebook, image_url, created_at, updated_at FROM oaps WHERE id = ? LIMIT 1",
//       [id]
//     );
//     if (!rows.length) return res.status(404).json({ error: "Not found" });
//     return res.json({ oap: rows[0] });
//   } catch (err) {
//     console.error("getOAP err", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// // async function uploadToCloudinary(fileBuffer, mimetype, publicIdPrefix = "oaps") {
// //   // returns secure_url
// //   const b64 = `data:${mimetype};base64,${fileBuffer.toString("base64")}`;
// //   const res = await cloudinary.uploader.upload(b64, {
// //     folder: publicIdPrefix,
// //     transformation: [{ width: 1200, height: 1200, crop: "limit" }],
// //     resource_type: "image",
// //   });
// //   return res.secure_url;
// // }



// async function uploadToCloudinary(fileBuffer) {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: "oaps",
//         resource_type: "image",
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result.secure_url);
//       }
//     );

//     streamifier.createReadStream(fileBuffer).pipe(uploadStream);
//   });
// }


// export async function createOAP(req, res) {
//   try {
//     const id = uuidv4();
//     const name = safeStr(req.body.name);
//     if (!name) return res.status(400).json({ error: "Name is required" });

//     const bio = safeStr(req.body.bio);
//     const twitter = safeStr(req.body.twitter);
//     const instagram = safeStr(req.body.instagram);
//     const facebook = safeStr(req.body.facebook);

//     let image_url = null;
//     if (req.file && req.file.buffer) {
//       try {
//         image_url = await uploadToCloudinary(req.file.buffer, req.file.mimetype, "oaps");
//       } catch (uerr) {
//         console.error("cloudinary upload err", uerr);
//         // continue without failing — optional: return error
//         return res.status(500).json({ error: "Image upload failed" });
//       }
//     } else if (req.body?.image_url) {
//       image_url = safeStr(req.body.image_url);
//     }

//     await pool.query(
//       "INSERT INTO oaps (id, name, bio, twitter, instagram, facebook, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [id, name, bio, twitter, instagram, facebook, image_url]
//     );


//     //    // 🔥 LOG ACTIVITY
//     // await logActivity({
//     //   actor_type: "admin",
//     //   actor_name: req.user.name,
//     //   action: "created program",
//     //   target_type: "program",
//     //   target_name: title,
//     // });

//     const [rows] = await pool.query("SELECT id, name, bio, twitter, instagram, facebook, image_url, created_at FROM oaps WHERE id = ? LIMIT 1", [id]);
//     const oap = rows[0];
//     return res.status(201).json({ oap });
//   } catch (err) {
//     console.error("createOAP err", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// export async function updateOAP(req, res) {
//   try {
//     const id = req.params.id;
//     const name = safeStr(req.body.name);
//     if (!name) return res.status(400).json({ error: "Name is required" });

//     const bio = safeStr(req.body.bio);
//     const twitter = safeStr(req.body.twitter);
//     const instagram = safeStr(req.body.instagram);
//     const facebook = safeStr(req.body.facebook);

//     // existing record check
//     const [existing] = await pool.query("SELECT id, image_url FROM oaps WHERE id = ? LIMIT 1", [id]);
//     if (!existing.length) return res.status(404).json({ error: "Not found" });

//     let image_url = existing[0].image_url;

//     if (req.file && req.file.buffer) {
//       try {
//         image_url = await uploadToCloudinary(req.file.buffer, req.file.mimetype, "oaps");
//       } catch (uerr) {
//         console.error("cloudinary upload err", uerr);
//         return res.status(500).json({ error: "Image upload failed" });
//       }
//     } else if (req.body?.image_url) {
//       image_url = safeStr(req.body.image_url);
//     }

//     await pool.query(
//       "UPDATE oaps SET name = ?, bio = ?, twitter = ?, instagram = ?, facebook = ?, image_url = ? WHERE id = ?",
//       [name, bio, twitter, instagram, facebook, image_url, id]
//     );

//     const [rows] = await pool.query("SELECT id, name, bio, twitter, instagram, facebook, image_url, updated_at FROM oaps WHERE id = ? LIMIT 1", [id]);
//     const oap = rows[0];
//     return res.json({ oap });
//   } catch (err) {
//     console.error("updateOAP err", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// export async function deleteOAP(req, res) {
//   try {
//     const id = req.params.id;
//     const [rows] = await pool.query("SELECT id FROM oaps WHERE id = ? LIMIT 1", [id]);
//     if (!rows.length) return res.status(404).json({ error: "Not found" });

//     await pool.query("DELETE FROM oaps WHERE id = ?", [id]);
//     return res.json({ ok: true });
//   } catch (err) {
//     console.error("deleteOAP err", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }


// // server/controllers/oapController.js
// import pool from "../config/db.js";
// import { v4 as uuidv4 } from "uuid";
// import cloudinary from "../config/cloudinary.js";

// function safeStr(v) {
//   return v == null ? null : String(v).trim();
// }

// /* ================= COUNT OAPS ================= */
// export async function oapCount(req, res) {
//   try {
//     const [rows] = await pool.query("SELECT COUNT(*) AS count FROM oaps");
//     res.json({ count: Number(rows[0].count) });
//   } catch (err) {
//     console.error("oapCount error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= LIST OAPS ================= */
// export async function listOAPs(req, res) {
//   try {
//     const [rows] = await pool.query(
//       "SELECT * FROM oaps ORDER BY created_at DESC"
//     );
//     res.json({ oaps: rows });
//   } catch (err) {
//     console.error("listOAPs error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= GET SINGLE OAP ================= */
// export async function getOAP(req, res) {
//   try {
//     const { id } = req.params;
//     const [rows] = await pool.query(
//       "SELECT * FROM oaps WHERE id = ? LIMIT 1",
//       [id]
//     );

//     if (!rows.length) return res.status(404).json({ error: "Not found" });

//     res.json({ oap: rows[0] });
//   } catch (err) {
//     console.error("getOAP error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= CREATE OAP ================= */
// export async function createOAP(req, res) {
//   try {
//     const id = uuidv4();
//     const name = safeStr(req.body.name);
//     const bio = safeStr(req.body.bio);

//     if (!name) return res.status(400).json({ error: "Name required" });

//     let image_url = null;

//     if (req.file?.buffer) {
//       const upload = await cloudinary.uploader.upload(
//         `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
//         { folder: "oaps" }
//       );
//       image_url = upload.secure_url;
//     }

//     await pool.query(
//       "INSERT INTO oaps (id, name, bio, image_url) VALUES (?, ?, ?, ?)",
//       [id, name, bio, image_url]
//     );

//     res.status(201).json({ id, name, bio, image_url });
//   } catch (err) {
//     console.error("createOAP error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= UPDATE OAP ================= */
// export async function updateOAP(req, res) {
//   try {
//     const { id } = req.params;
//     const name = safeStr(req.body.name);
//     const bio = safeStr(req.body.bio);
//     const image_url = safeStr(req.body.image_url);

//     await pool.query(
//       "UPDATE oaps SET name=?, bio=?, image_url=? WHERE id=?",
//       [name, bio, id, image_url]
//     );

//     res.json({ ok: true });
//   } catch (err) {
//     console.error("updateOAP error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= DELETE OAP ================= */
// export async function deleteOAP(req, res) {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM oaps WHERE id=?", [id]);
//     res.json({ ok: true });
//   } catch (err) {
//     console.error("deleteOAP error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }



// import pool from "../config/db.js";
// import { v4 as uuidv4 } from "uuid";
// import cloudinary from "../config/cloudinary.js";

// /* ─────────── HELPERS ─────────── */
// function safeStr(v) {
//   return v == null ? null : String(v).trim();
// }

// /* ================= COUNT OAPS ================= */
// export async function oapCount(req, res) {
//   try {
//     const [rows] = await pool.query(
//       "SELECT COUNT(*) AS count FROM oaps"
//     );
//     res.json({ count: Number(rows[0].count) });
//   } catch (err) {
//     console.error("oapCount error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= LIST OAPS + PROGRAMS ================= */
// export async function listOAPs(req, res) {
//   try {
//     const [rows] = await pool.query(`
//       SELECT 
//         o.id,
//         o.name,
//         o.bio,
//         o.image_url,
//         o.created_at,
//         COALESCE(
//           JSON_ARRAY(
//             CASE 
//               WHEN p.id IS NULL THEN NULL
//               ELSE JSON_OBJECT(
//                 'id', p.id,
//                 'title', p.title,
//                 'day', p.day,
//                 'time', p.time
//               )
//             END
//           ),
//           JSON_ARRAY()
//         ) AS programs
//       FROM oaps o
//       LEFT JOIN programs p ON p.oap_id = o.id
//       GROUP BY o.id
//       ORDER BY o.created_at DESC
//     `);

//     // remove null program objects
//     const clean = rows.map(oap => ({
//       ...oap,
//       programs: oap.programs.filter(Boolean),
//     }));

//     res.json({ oaps: clean });
//   } catch (err) {
//     console.error("listOAPs error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= GET SINGLE OAP ================= */
// export async function getOAP(req, res) {
//   try {
//     const { id } = req.params;

//     const [[oap]] = await pool.query(
//       "SELECT * FROM oaps WHERE id = ? LIMIT 1",
//       [id]
//     );

//     if (!oap) {
//       return res.status(404).json({ error: "OAP not found" });
//     }

//     const [programs] = await pool.query(
//       "SELECT id, title, day, time FROM programs WHERE oap_id = ?",
//       [id]
//     );

//     res.json({
//       ...oap,
//       programs,
//     });
//   } catch (err) {
//     console.error("getOAP error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= CREATE OAP ================= */
// export async function createOAP(req, res) {
//   try {
//     const id = uuidv4();
//     const name = safeStr(req.body.name);
//     const bio = safeStr(req.body.bio);

//     if (!name) {
//       return res.status(400).json({ error: "Name is required" });
//     }

//     let image_url = null;

//     if (req.file?.buffer) {
//       const upload = await cloudinary.uploader.upload(
//         `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
//         { folder: "oaps" }
//       );
//       image_url = upload.secure_url;
//     }

//     await pool.query(
//       "INSERT INTO oaps (id, name, bio, image_url) VALUES (?, ?, ?, ?)",
//       [id, name, bio, image_url]
//     );

//     res.status(201).json({
//       id,
//       name,
//       bio,
//       image_url,
//     });
//   } catch (err) {
//     console.error("createOAP error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= UPDATE OAP (WITH IMAGE) ================= */
// export async function updateOAP(req, res) {
//   try {
//     const { id } = req.params;
//     const name = safeStr(req.body.name);
//     const bio = safeStr(req.body.bio);

//     const [[existing]] = await pool.query(
//       "SELECT image_url FROM oaps WHERE id = ? LIMIT 1",
//       [id]
//     );

//     if (!existing) {
//       return res.status(404).json({ error: "OAP not found" });
//     }

//     let image_url = existing.image_url;

//     // upload new image if provided
//     if (req.file?.buffer) {
//       const upload = await cloudinary.uploader.upload(
//         `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
//         { folder: "oaps" }
//       );
//       image_url = upload.secure_url;
//     }

//     await pool.query(
//       "UPDATE oaps SET name=?, bio=?, image_url=? WHERE id=?",
//       [name, bio, image_url, id]
//     );

//     res.json({
//       ok: true,
//       id,
//       name,
//       bio,
//       image_url,
//     });
//   } catch (err) {
//     console.error("updateOAP error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }

// /* ================= DELETE OAP ================= */
// export async function deleteOAP(req, res) {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM oaps WHERE id = ?", [id]);
//     res.json({ ok: true });
//   } catch (err) {
//     console.error("deleteOAP error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// }


// server/controllers/oapController.js
import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../config/cloudinary.js";

function safe(v) {
  return v == null ? null : String(v).trim();
}

/* ================= COUNT OAPS ================= */
export async function oapCount(req, res) {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) AS count FROM oaps");
    res.json({ count: Number(rows[0]?.count || 0) });
  } catch (err) {
    console.error("oapCount error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

/* ================= LIST OAPS + ASSOCIATED PROGRAMS ================= */
// Compatible with MariaDB 10.4 / MySQL 5.6+ (no JSON_ARRAYAGG)
export async function listOAPs(req, res) {
  try {
    // Step 1: Get all OAPs
    const [oapsRows] = await pool.query(`
      SELECT 
        id,
        name,
        bio,
        image_url,
        created_at
      FROM oaps
      ORDER BY created_at DESC
    `);

    // Step 2: Get all program associations through schedules
    const [relationsRows] = await pool.query(`
      SELECT DISTINCT
        s.oap_id,
        p.id          AS program_id,
        p.title,
        p.image_url   AS program_image_url
      FROM schedules s
      INNER JOIN programs p ON p.id = s.program_id
      ORDER BY s.oap_id
    `);

    // Step 3: Group programs by OAP in JavaScript
    const programsMap = new Map();

    relationsRows.forEach(row => {
      if (!programsMap.has(row.oap_id)) {
        programsMap.set(row.oap_id, []);
      }
      programsMap.get(row.oap_id).push({
        id: row.program_id,
        title: row.title,
        image_url: row.program_image_url
      });
    });

    // Step 4: Combine OAPs with their programs
    const result = oapsRows.map(oap => ({
      id: oap.id,
      name: oap.name,
      bio: oap.bio,
      image_url: oap.image_url,
      created_at: oap.created_at,
      programs: programsMap.get(oap.id) || []
    }));

    res.json({ oaps: result });
  } catch (err) {
    console.error("listOAPs error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

/* ================= GET SINGLE OAP + PROGRAMS ================= */
export async function getOAP(req, res) {
  try {
    const { id } = req.params;

    const [oapRows] = await pool.query(
      "SELECT id, name, bio, image_url, created_at FROM oaps WHERE id = ? LIMIT 1",
      [id]
    );

    if (oapRows.length === 0) {
      return res.status(404).json({ error: "OAP not found" });
    }

    const oap = oapRows[0];

    // Get associated programs
    const [programs] = await pool.query(`
      SELECT DISTINCT
        p.id,
        p.title,
        p.image_url
      FROM schedules s
      INNER JOIN programs p ON p.id = s.program_id
      WHERE s.oap_id = ?
      ORDER BY p.title
    `, [id]);

    res.json({
      ...oap,
      programs
    });
  } catch (err) {
    console.error("getOAP error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

/* ================= CREATE OAP ================= */
export async function createOAP(req, res) {
  try {
    const id = uuidv4();
    const name = safe(req.body.name);
    const bio = safe(req.body.bio);

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    let image_url = null;

    if (req.file?.buffer) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "oaps",
          resource_type: "image"
        }
      );
      image_url = uploadResult.secure_url;
    }

    await pool.query(
      "INSERT INTO oaps (id, name, bio, image_url) VALUES (?, ?, ?, ?)",
      [id, name, bio, image_url]
    );

    res.status(201).json({
      id,
      name,
      bio,
      image_url
    });
  } catch (err) {
    console.error("createOAP error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

/* ================= UPDATE OAP ================= */
export async function updateOAP(req, res) {
  try {
    const { id } = req.params;
    const name = safe(req.body.name);
    const bio = safe(req.body.bio);

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    // Check if exists & get current image
    const [existingRows] = await pool.query(
      "SELECT image_url FROM oaps WHERE id = ? LIMIT 1",
      [id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({ error: "OAP not found" });
    }

    let image_url = existingRows[0].image_url;

    // Replace image if new one is uploaded
    if (req.file?.buffer) {
      const uploadResult = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "oaps",
          resource_type: "image"
        }
      );
      image_url = uploadResult.secure_url;
    }

    await pool.query(
      "UPDATE oaps SET name = ?, bio = ?, image_url = ? WHERE id = ?",
      [name, bio, image_url, id]
    );

    res.json({
      id,
      name,
      bio,
      image_url
    });
  } catch (err) {
    console.error("updateOAP error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

/* ================= DELETE OAP ================= */
export async function deleteOAP(req, res) {
  try {
    const { id } = req.params;

    const [check] = await pool.query("SELECT id FROM oaps WHERE id = ? LIMIT 1", [id]);
    if (check.length === 0) {
      return res.status(404).json({ error: "OAP not found" });
    }

    await pool.query("DELETE FROM oaps WHERE id = ?", [id]);

    res.json({ success: true });
  } catch (err) {
    console.error("deleteOAP error:", err);
    res.status(500).json({ error: "Server error" });
  }
}


/* ================= PUBLIC OAP FETCHING ================= */

export const getSingleOAP = async (req, res)=>{
  try {
    const {id} = req.params;

    const[rows] = await pool.query(
      "SELECT * FROM oaps WHERE id=?", [id]
    );

    if(rows.length === 0){
      return
      res.status(404).json({message:"OAP not found"});
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
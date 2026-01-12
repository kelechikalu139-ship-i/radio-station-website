// // // routes/uploadRoutes.js
// // const express = require('express');
// // const router = express.Router();
// // const multer = require('multer');
// // const uploadController = require('../controllers/uploadController');

// // // multer in-memory
// // const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// // router.post('/admin/upload-avatar', upload.single('file'), uploadController.uploadAvatar);

// // module.exports = router;


// // routes/uploadRoutes.js
// // const express = require('express');
// // const router = express.Router();
// // const multer = require('multer');
// // const uploadController = require('../controllers/uploadController');

// // // multer in-memory
// // const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// // router.post('/admin/upload-avatar', upload.single('file'), uploadController.uploadAvatar);

// // module.exports = router;


// import cloudinary from "../config/cloudinary.js";

// export const uploadAvatar = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const upload = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           {
//             folder: "admins",
//             resource_type: "image",
//           },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         )
//         .end(req.file.buffer);
//     });

//     return res.json({
//       ok: true,
//       avatarUrl: upload.secure_url,
//       publicId: upload.public_id,
//     });
//   } catch (err) {
//     console.error("UPLOAD ERROR:", err);
//     res.status(500).json({ error: "Avatar upload failed" });
//   }
// };

// // controllers/uploadController.js
// const cloudinary = require('../config/cloudinary');
// const streamifier = require('streamifier');

// exports.uploadAvatar = async (req, res) => {
//   try {
//     if (!req.file || !req.file.buffer) return res.status(400).json({ error: 'No file' });

//     // stream buffer into cloudinary uploader
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder: 'admins', resource_type: 'image', overwrite: true },
//       (err, result) => {
//         if (err) {
//           console.error('cloudinary upload err', err);
//           return res.status(500).json({ error: 'Upload failed' });
//         }
//         return res.json({ ok: true, avatarUrl: result.secure_url, publicId: result.public_id });
//       }
//     );

//     streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
//   } catch (err) {
//     console.error('uploadAvatar err', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };


// server/controllers/uploadController.js
// import cloudinary from "../config/cloudinary.js";
// import streamifier from "streamifier";

// export const uploadAvatar = async (req, res) => {
//   try {
//     if (!req.file || !req.file.buffer) {
//       return res.status(400).json({ error: "No file received" });
//     }

//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder: "nexterfm",
//         resource_type: "image",
//       },
//       (error, result) => {
//         if (error) {
//           console.error("Cloudinary upload error:", error);
//           return res.status(500).json({ error: "Cloudinary upload failed" });
//         }

//         return res.json({
//           ok: true,
//           avatarUrl: result.secure_url,
//           publicId: result.public_id,
//         });
//       }
//     );

//     streamifier.createReadStream(req.file.buffer).pipe(stream);
//   } catch (err) {
//     console.error("uploadAvatar fatal error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };





// import cloudinary from "../config/cloudinary.js";
// import streamifier from "streamifier";

// export const uploadAvatar = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const streamUpload = () =>
//       new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             folder: "admins",
//             resource_type: "image",
//           },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           }
//         );

//         streamifier.createReadStream(req.file.buffer).pipe(stream);
//       });

//     const result = await streamUpload();

//     return res.json({
//       ok: true,
//       avatarUrl: result.secure_url,
//       publicId: result.public_id,
//     });
//   } catch (error) {
//     console.error("Avatar upload error:", error);
//     return res.status(500).json({ message: "Avatar upload failed" });
//   }
// };

// server/controllers/uploadController.js
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file provided" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "nexterfm",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ error: "Upload failed" });
        }

        return res.json({
          ok: true,
          avatarUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error("uploadAvatar fatal error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// // server/config/cloudinary.js
// import cloudinary from "cloudinary";
// import streamifier from "streamifier";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// /**
//  * Upload a buffer to Cloudinary via stream
//  * @param {Buffer} buffer
//  * @param {string} folder
//  * @returns {Promise<object>} Cloudinary result
//  */
// export function uploadBufferToCloudinary(buffer, folder = "nexter_admin_avatars") {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.v2.uploader.upload_stream(
//       { folder, resource_type: "image" },
//       (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(uploadStream);
//   });
// }


// const cloudinary = require('cloudinary').v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// module.exports = cloudinary;

// server/config/cloudinary.js
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;


// server/config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

// IMPORTANT: dotenv must already be loaded in index.js
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;


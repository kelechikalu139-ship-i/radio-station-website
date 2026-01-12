// // // server/routes/admin.js
// // import express from "express";
// // import multer from "multer";
// // import rateLimit from "express-rate-limit";

// // import {
// //   register,
// //   login,
// //   me,
// //   logout,
// //   listAdmins,
// //   countAdminsEndpoint,
// //   createAdmin,
// //   deleteAdmin,
// // } from "../controllers/adminController.js";
// // // if not already imported
// // import { updateAdmin } from "../controllers/adminController.js";

// // import { uploadAvatar } from "../controllers/uploadController.js";



// // import { verifyToken, requireRole } from "../middleware/auth.js";

// // const router = express.Router();
// // const upload = multer(); // memory storage

// // const loginLimiter = rateLimit({
// //   windowMs: 60 * 1000, // 1 minute
// //   max: 6,
// //   message: { error: "Too many login attempts, slow down" },
// // });

// // // register: accepts multipart/form-data (avatar file) or form fields
// // router.post("/register", upload.single("avatar"), register);

// // // login (rate-limited)
// // router.post("/login", loginLimiter, login);

// // // me (protected)
// // router.get("/me", verifyToken, me);

// // // logout (protected) - blacklists current token
// // router.post("/logout", verifyToken, logout);

// // // admin management routes
// // router.get("/admins", verifyToken, listAdmins);

// // // lightweight count endpoint (protected)
// // router.get("/admins/count", verifyToken, countAdminsEndpoint);

// // // create admin (only superadmin)
// // router.post("/admins", verifyToken, requireRole("superadmin"), createAdmin);

// // // upload admin avatar
// // router.post(
// //   "/admins/upload-avatar",
// //   verifyToken,
// //   upload.single("file"),
// //   uploadAvatar
// // );


// // // update admin (protected) — allows superadmin or self-edit
// // router.put("/admins/:id", verifyToken, updateAdmin);


// // // delete admin (only superadmin)
// // router.delete("/admins/:id", verifyToken, requireRole("superadmin"), deleteAdmin);

// // export default router;


// // server/routes/admin.js
// import express from "express";
// import multer from "multer";
// import rateLimit from "express-rate-limit";

// import {
//   register,
//   login,
//   me,
//   logout,
//   listAdmins,
//   countAdminsEndpoint,
//   createAdmin,
//   deleteAdmin,
//   updateAdmin,
// } from "../controllers/adminController.js";

// import { uploadAvatar } from "../controllers/uploadController.js";
// import { verifyToken, requireRole } from "../middleware/auth.js";

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// const loginLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 6,
//   message: { error: "Too many login attempts" },
// });

// /* AUTH */
// router.post("/register", upload.single("avatar"), register);
// router.post("/login", loginLimiter, login);
// router.get("/me", verifyToken, me);
// router.post("/logout", verifyToken, logout);

// /* ADMINS */
// router.get("/admins", verifyToken, listAdmins);
// router.get("/admins/count", verifyToken, countAdminsEndpoint);
// router.post("/admins", verifyToken, requireRole("superadmin"), createAdmin);
// router.put("/admins/:id", verifyToken, updateAdmin);
// router.delete("/admins/:id", verifyToken, requireRole("superadmin"), deleteAdmin);


// router.post(
//   "/admins/upload-avatar",
//   verifyToken,
//   upload.single("file"),
//   uploadAvatar
// );

// export default router;


// server/routes/admin.js
import express from "express";
import multer from "multer";
import rateLimit from "express-rate-limit";

import {
  register,
  login,
  me,
  logout,
  listAdmins,
  countAdminsEndpoint,
  createAdmin,
  deleteAdmin,
  updateAdmin,
} from "../controllers/adminController.js";

import { uploadAvatar } from "../controllers/uploadController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 6,
});

/* AUTH */
router.post("/register", upload.single("avatar"), register);
router.post("/login", loginLimiter, login);
router.get("/me", verifyToken, me);
router.post("/logout", verifyToken, logout);

/* ADMINS */
router.get("/admins", verifyToken, listAdmins);
router.get("/admins/count", verifyToken, countAdminsEndpoint);
router.post("/admins", verifyToken, requireRole("superadmin"), createAdmin);
router.put("/admins/:id", verifyToken, updateAdmin);
router.delete("/admins/:id", verifyToken, requireRole("superadmin"), deleteAdmin);

/* ✅ AVATAR UPLOAD */
router.post(
  "/admins/upload-avatar",
  verifyToken,
  upload.single("file"),
  uploadAvatar
);

export default router;



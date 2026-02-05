// // import multer from "multer";
// // import express from "express";
// // import {
// //   programCount,
// //   listPrograms,
// //   getProgram,
// //   createProgram,
// //   updateProgram,
// //   deleteProgram,
// // } from "../controllers/programController.js";
// // import { verifyToken, requireRole } from "../middleware/auth.js";

// // const router = express.Router();
// // const upload = multer({ storage: multer.memoryStorage() });

// // // const upload = multer(); // memory storage

// // // Programs CRUD
// // router.get("/programs/count", verifyToken, programCount)
// // router.get("/programs", verifyToken, listPrograms);
// // router.get("/programs/:id", verifyToken, getProgram);
// // router.post("/programs", verifyToken, requireRole("superadmin", "admin"), upload.single("avatar"), createProgram);
// // router.put("/programs/:id", verifyToken, requireRole("superadmin", "admin"), upload.single("avatar"), updateProgram);
// // router.delete("/programs/:id", verifyToken, requireRole("superadmin"), deleteProgram);

// // export default router


// import express from "express";
// import multer from "multer";
// import {
//   programCount,
//   listPrograms,
//   getProgram,
//   createProgram,
//   updateProgram,
//   deleteProgram,
// } from "../controllers/programController.js";
// import { verifyToken, requireRole } from "../middleware/auth.js";

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// // COUNT
// router.get("/programs/count", verifyToken, programCount);

// // CRUD
// router.get("/programs", verifyToken, listPrograms);
// router.get("/programs/:id", verifyToken, getProgram);
// router.post(
//   "/programs",
//   verifyToken,
//   requireRole("superadmin", "admin"),
//   upload.single("avatar"),
//   createProgram
// );
// router.put(
//   "/programs/:id",
//   verifyToken,
//   requireRole("superadmin", "admin"),
//   upload.single("avatar"),
//   updateProgram
// );
// router.delete(
//   "/programs/:id",
//   verifyToken,
//   requireRole("superadmin"),
//   deleteProgram
// );

// export default router;




import express from "express";
import multer from "multer";
import {
  programCount,
  listPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/programController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// COUNT
router.get("/programs/count", verifyToken, programCount);

// CRUD
router.get("/programs", verifyToken, listPrograms);
router.get("/programs/:id", verifyToken, getProgram);

// Use "image" as the field name (matches frontend FormData)
router.post(
  "/programs",
  verifyToken,
  requireRole("superadmin", "admin"),
  upload.single("image"),           // ← changed from "avatar"
  createProgram
);

router.put(
  "/programs/:id",
  verifyToken,
  requireRole("superadmin", "admin"),
  upload.single("image"),           // ← changed from "avatar"
  updateProgram
);

router.delete(
  "/programs/:id",
  verifyToken,
  requireRole("superadmin"),
  deleteProgram
);

export default router;

// server/routes/admin.js (ESM) — add these imports near top
import multer from "multer";
import express from "express";

import {
  listOAPs,
  getOAP,
  createOAP,
  updateOAP,
  deleteOAP,
  oapCount,
} from "../controllers/oapController.js";

// const upload = multer(); // memory storage
import { uploadAvatar } from "../controllers/uploadController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });



// OAP routes (protected)
router.get("/oaps/count", verifyToken, oapCount)
router.get("/oaps", verifyToken, listOAPs);
router.get("/oaps/:id", verifyToken, getOAP);
router.post("/oaps", verifyToken, requireRole("superadmin", "admin"), upload.single("avatar"), createOAP);
router.put("/oaps/:id", verifyToken, requireRole("superadmin", "admin"), upload.single("avatar"), updateOAP);
router.delete("/oaps/:id", verifyToken, requireRole("superadmin"), deleteOAP);

export default router
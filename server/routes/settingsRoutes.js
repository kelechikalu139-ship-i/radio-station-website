import multer from "multer";
import express from "express";

import {
  listSettings, getSetting, upsertSetting
} from "../controllers/settingsController.js";

// const upload = multer(); // memory
import { uploadAvatar } from "../controllers/uploadController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });



// Settings (key-value)
router.get("/settings", verifyToken, listSettings);
router.get("/settings/:key", verifyToken, getSetting);
router.put("/settings/:key", verifyToken, requireRole("superadmin"), upsertSetting);

export default router;

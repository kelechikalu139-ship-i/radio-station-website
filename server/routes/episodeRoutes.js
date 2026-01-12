import multer from "multer";
import express from "express"
import {
  listEpisodes, getEpisode, createEpisode, updateEpisode, deleteEpisode
} from "../controllers/episodesController.js";

import { uploadAvatar } from "../controllers/uploadController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });



// const upload = multer(); // memory

// Episodes (audio + cover)
router.get("/episodes", verifyToken, listEpisodes);
router.get("/episodes/:id", verifyToken, getEpisode);
router.post("/episodes", verifyToken, requireRole("superadmin","admin"), upload.fields([{ name: "audio", maxCount: 1 }, { name: "cover", maxCount: 1 }]), createEpisode);
router.put("/episodes/:id", verifyToken, requireRole("superadmin","admin"), upload.fields([{ name: "audio", maxCount: 1 }, { name: "cover", maxCount: 1 }]), updateEpisode);
router.delete("/episodes/:id", verifyToken, requireRole("superadmin"), deleteEpisode);

export default router;



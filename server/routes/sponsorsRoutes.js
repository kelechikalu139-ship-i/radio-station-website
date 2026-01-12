import multer from "multer";
import express from "express"

import {
  listSponsors, getSponsor, createSponsor, updateSponsor, deleteSponsor
} from "../controllers/sponsorsController.js";



// const upload = multer(); // memory
import { uploadAvatar } from "../controllers/uploadController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


// Sponsors (logo)
router.get("/sponsors", verifyToken, listSponsors);
router.get("/sponsors/:id", verifyToken, getSponsor);
router.post("/sponsors", verifyToken, requireRole("superadmin","admin"), upload.single("logo"), createSponsor);
router.put("/sponsors/:id", verifyToken, requireRole("superadmin","admin"), upload.single("logo"), updateSponsor);
router.delete("/sponsors/:id", verifyToken, requireRole("superadmin"), deleteSponsor);

export default router;



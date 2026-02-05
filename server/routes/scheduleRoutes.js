// at top of server/routes/admin.js
import express from "express";
import {
  listSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  scheduleCount,
  // getLiveProgram,
  // getNextProgram,
  // getTodaySchedule
} from "../controllers/scheduleController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();


// add routes (protected)
router.get("/schedules/count", verifyToken, scheduleCount)
router.get("/schedules", verifyToken, listSchedules);
router.get("/schedules/:id", verifyToken, getSchedule);
router.post("/schedules", verifyToken, requireRole("superadmin", "admin"), createSchedule);
router.put("/schedules/:id", verifyToken, requireRole("superadmin", "admin"), updateSchedule);
router.delete("/schedules/:id", verifyToken, requireRole("superadmin"), deleteSchedule);

// public routes here 
// router.get('/schedule/live-program', getLiveProgram);
// router.get('/schedule/next-program', getNextProgram);
// router.get('/schedule/today', getTodaySchedule);
// or router.get('/schedule', getFullSchedule); for week view

export default router;

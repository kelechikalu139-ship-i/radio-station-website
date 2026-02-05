// server/routes/publicSchedule.js
import express from "express";
import {
  getLiveProgram,
  getNextProgram,
  getTodaySchedule,
  getWeeklySchedule
} from "../controllers/scheduleController.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/live-program", getLiveProgram);
router.get("/next-program", getNextProgram);
router.get("/today", getTodaySchedule);
router.get("/weekly", getWeeklySchedule);



export default router;

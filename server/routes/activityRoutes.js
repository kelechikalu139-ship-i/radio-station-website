// import express from "express";
// import { getRecentActivity } from "../controllers/activityController.js";
// import { verifyToken } from "../middleware/auth.js";

// const router = express.Router();

// router.get("/", verifyToken, getRecentActivity);

// export default router;


import express from "express";
import { getAllActivityLog, getRecentActivity } from "../controllers/activityController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRecentActivity);
router.get("/activity", verifyToken, getAllActivityLog);
// router.get("/", getAllActivityLog)

export default router;

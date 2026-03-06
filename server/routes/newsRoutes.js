import express from "express";
import multer from "multer";
import {
  listNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
  newsCount,
} from "../controllers/newsController.js";

const router = express.Router();
const upload = multer();

// COUNT
router.get("/count", newsCount);

// LIST
router.get("/", listNews);

// GET ONE
router.get("/:id", getNews);

// CREATE
router.post("/", upload.single("image"), createNews);

// UPDATE
router.put("/:id", upload.single("image"), updateNews);

// DELETE
router.delete("/:id", deleteNews);

export default router;



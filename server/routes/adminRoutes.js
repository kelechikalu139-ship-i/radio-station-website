// const express = require('express');
// const {body} = require('express-validator');
// const router = express.Router();
// const ctrl = require('../controllers/adminController');
// const {verifyToken, requireRole} = require('../middleware/auth');
// const multer = require('multer');
// const upload = multer({storage: multer.memoryStorage(), limits: {fileSize: 2 * 1024 * 1024}});


// // Public: register (only allow creation by superadmin OR allow first-time bootstrap)
// // Decide: allow open registration? Typically only superadmins create other admins.
// // Here we expose a /register that accepts a `bootstrap` query to create first superadmin if none exists.

// router.post('/register',
//     upload.single('avatar'),
//     [
//         body('email').isEmail().withMessage('Invalid email'),
//         body('password').isLength({min:8}).withMessage('Password must be greater or quall to 8 chars'),
//         body('role').optional().isIn(['superadmin', 'admin', 'editor'])
//     ],
//     ctrl.register
// );

// router.post('/login',
//     [
//         body('email').isEmail(),
//         body('password').exists()
//     ],
//     ctrl.login
// );

// // example of protected admin-only route
// router.get('/me', verifyToken, ctrl.me);

// // create an admin (only superadmin)
// router.post('/register', verifyToken, requireRole('superadmin'), upload.single('avatar'), ctrl.createAdmin);

// // list admins (superadmin)
// router.get('/', verifyToken, requireRole('superadmin'), ctrl.listAdmins);

// // delete admin (superadmin)
// router.delete('/:id', verifyToken, requireRole('superadmin'), ctrl.deleteAdmin);

// module.exports = router;



// routes/adminRoutes.js
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const ctrl = require("../controllers/adminController");
const { verifyToken, requireRole } = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

// Public register (bootstrap for first admin)
router.post(
  "/register",
  upload.single("avatar"),
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 8 }).withMessage("Password must be >= 8 chars"),
    body("role").optional().isIn(["superadmin", "admin", "editor"])
  ],
  ctrl.register
);

// Public login
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").exists()
  ],
  ctrl.login
);

// Protected: get current admin
router.get("/me", verifyToken, ctrl.me);

// Protected: create admin (only superadmin)
router.post("/create", verifyToken, requireRole("superadmin"), upload.single("avatar"), ctrl.createAdmin);

// list admins (superadmin)
router.get("/", verifyToken, requireRole("superadmin"), ctrl.listAdmins);

// delete admin (superadmin)
router.delete("/:id", verifyToken, requireRole("superadmin"), ctrl.deleteAdmin);

module.exports = router;

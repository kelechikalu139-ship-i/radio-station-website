// server/middleware/requireRole.js
export default function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const admin = req.admin;
    if (!admin) return res.status(401).json({ error: "Unauthorized" });
    if (!allowedRoles.includes(admin.role)) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

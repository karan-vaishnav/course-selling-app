const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminAuth(req, res, next) {
  const token = req.headers.authorization;

  const response = jwt.verify(token, JWT_ADMIN_SECRET);

  if (response) {
    req.userId = response.id;
    next();
  } else {
    res.status(403).json({
      message: "Invalid Credentials",
    });
  }
}

module.exports = adminAuth;

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization;

  const response = jwt.verify(token, JWT_SECRET);

  if (response) {
    req.userId = req.response;
    next();
  } else {
    res.status(403).json({
      message: "Invalid Credentials",
    });
  }
}

module.exports = {
  auth
};

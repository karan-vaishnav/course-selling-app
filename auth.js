const jwt = require("jsonwebtoken");
const JWT_SECRET = "S3cret";

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
  auth,
  JWT_SECRET,
};

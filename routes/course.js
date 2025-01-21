const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "Get all my courses endpoint",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "Login endpoint",
  });
});

module.exports = {
  courseRouter: courseRouter,
};

const { Router } = require("express");
const adminModel = require("../db")

const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "Signup admin endpoint",
  });
});

adminRouter.post("/login", function (req, res) {
  res.json({
    message: "Login admin endpoint",
  });
});

adminRouter.post("/course", function (req, res) {
  res.json({
    message: "admin create post endpoint",
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "admin edit post endpoint",
  });
});

adminRouter.get("/courses", function (req, res) {
  res.json({
    message: "admin get all courses endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};

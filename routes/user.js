const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", function (req, res) {
  res.json({
    message: "Signup endpoint",
  });
});

userRouter.post("/login", function (req, res) {
    res.json({
      message: "Login endpoint",
    });
  });

userRouter.post("/purchases", function (req, res) {
  res.json({
    message: "Purchase endpoint",
  });
});

module.exports = {
    userRouter: userRouter
}

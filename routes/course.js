const { Router } = require("express");
const { purchaseModel, coursesModel } = require("../db");
const userAuth = require("../middleware/user");
const courseRouter = Router();

courseRouter.post("/purchase", userAuth, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "you have successfully bought the course!",
  });
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await coursesModel.find({});

  res.json({
    courses,
  });
});

module.exports = {
  courseRouter: courseRouter,
};

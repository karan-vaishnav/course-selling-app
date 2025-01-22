const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://Karan:FUtijhcjC0yd9l9z@cluster0.iy9km.mongodb.net/course-selling-app"
  );

  app.listen(3000);
}

main();

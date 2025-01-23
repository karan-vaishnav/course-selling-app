require("dotenv").config();
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
  const mongoUrl = process.env.MONGO_URL;
  await mongoose.connect(mongoUrl);

  app.listen(4000);
}

main();

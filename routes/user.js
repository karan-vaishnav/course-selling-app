const bcrypt = require("bcrypt");
const { Router } = require("express");
const z = require("zod");
const { userModel } = require("../db");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  //Input Validations
  const userZodSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(36),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
  });

  const parsedData = userZodSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      message: "Invalid Format",
      error: parsedData.error,
    });
    return;
  }

  //hashing+salting
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  let errorThrown = false;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    //created model
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    res.json({
      message: "User Already Exist",
    });
    errorThrown = true;
  }

  if (!errorThrown) {
    res.json({
      message: "You are signed up!",
    });
  }
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
  userRouter: userRouter,
};

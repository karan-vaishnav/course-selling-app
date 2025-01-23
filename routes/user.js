const bcrypt = require("bcrypt");
const { Router } = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
const userAuth = require("../middleware/user");
const { userModel, purchaseModel, coursesModel } = require("../db");
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

userRouter.post("/login", async function (req, res) {
  const { email, password } = req.body;

  //finding user via-- email
  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    res.status(403).json({
      message: "Incorrect Credentials!",
    });
    return;
  }
  //Matching Passwords
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(403).json({
      message: "Incorrect Credentials!",
    });
    return;
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
    },
    JWT_USER_SECRET
  );
  res.json({
    token,
  });
});

userRouter.post("/purchases", userAuth, async function (req, res) {
  const userId = req.userId;

  const purchases = await purchaseModel.find({
    userId,
  });

  const coursesData = await coursesModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });

  res.json({
    purchases,
    coursesData,
  });
});

module.exports = { userRouter };

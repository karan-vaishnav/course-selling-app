const { Router } = require("express");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = "adminS3cret";
const { adminModel } = require("../db");
const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
  //Input Validations
  const adminZodSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(36),
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
  });

  const parsedData = adminZodSchema.safeParse(req.body);

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
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    res.json({
      message: "Admin Already Exist",
    });
    errorThrown = true;
  }

  if (!errorThrown) {
    res.json({
      message: "You are signed up!",
    });
  }
});

adminRouter.post("/login", async function (req, res) {
  const { email, password } = req.body;

  //finding user via-- email
  const admin = await adminModel.findOne({
    email,
  });

  if (!admin) {
    res.status(403).json({
      message: "Incorrect Credentials!",
    });
    return;
  }
  //Matching Passwords
  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    res.status(403).json({
      message: "Incorrect Credentials!",
    });
    return;
  }

  const token = jwt.sign(
    {
      id: admin._id.toString(),
    },
    JWT_ADMIN_SECRET
  );
  res.json({
    token,
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

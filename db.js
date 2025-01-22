const mongoose = require("mongoose");
console.log("mongo connected");
mongoose.connect(
  "mongodb+srv://Karan:FUtijhcjC0yd9l9z@cluster0.iy9km.mongodb.net/course-selling-app"
);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "userModel" },
  courseId: { type: Schema.Types.ObjectId, ref: "courseModel" },
});

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const coursesModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  coursesModel,
  purchaseModel,
};

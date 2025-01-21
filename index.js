const express = require("express");

const app = express();
app.use(express.json());

app.post("/user/signup", function (req, res) {
    res.json({
        message: "Signup endpoint"
    })
});

app.post("/user/login", function (req, res) {
    res.json({
        message: "login endpoint"
    })
});

app.get("/user/purchases", function (req, res) {
    res.json({
        message: "Purchased Courses endpoint"
    })
});

app.post("/course/purchase", function (req, res) {
    res.json({
        message: "Purchase endpoint"
    })
});

app.get("/courses", function (req, res) {
    res.json({
        message: "All Courses endpoint"
    })
});

app.listen(3000);

const express = require("express");

const app = express();
app.use(express.json());

app.post("/signup", function (req, res) {});

app.post("/login", function (req, res) {});

app.post("/purchase", function (req, res) {});

app.post("/purchasedCourses", function (req, res) {});

app.post("/courses", function (req, res) {});

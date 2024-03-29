require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const { connect } = require("./config/Database");
connect();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const adminMiddleware = require("./middlewares/verifyAdmin");
const userMiddleware = require("./middlewares/verifyUser");

const authController = require("./routes/user/authController");
app.use("/user", authController);

// admin
const userController = require("./routes/admin/userController");
app.use("/admin", adminMiddleware, userController);

const courseController = require("./routes/admin/courseController");
app.use("/admin", adminMiddleware, courseController);

const subjectController = require("./routes/admin/subjectController");
app.use("/admin", adminMiddleware, subjectController);


// user
const userCourseController = require("./routes/user/courseController");
app.use("/user", userMiddleware, userCourseController);

const userSubjectController = require("./routes/user/subjectController");
app.use("/user", userMiddleware, userSubjectController);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

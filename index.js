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

const adminMiddleware = require("./middlewares/verifyUser");

const AdminUserRoutes = require("./routes/admin/userController");
const AdminAuthRoutes = require("./routes/admin/authController");
const AdminCategoryRoutes = require("./routes/admin/catrgoryController");
const AdminItemRoutes = require("./routes/admin/itemController");

app.use("/admin/auth", AdminAuthRoutes);
app.use("/admin/user", adminMiddleware, AdminUserRoutes);
app.use("/admin/category", adminMiddleware, AdminCategoryRoutes);
app.use("/admin/item", adminMiddleware, AdminItemRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

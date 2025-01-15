const express = require("express");
dotenv = require("dotenv").config;
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const schoolRouter = require("./router/school.router");
// const connectDB = require("./config/db");
// const authRoutes = require("./Route/authRoutes");
// const parentRoutes = require("./Route/parentRoute");
// const ptaRoutes = require("./Route/ptaRoutes");
// const teacherRoutes = require("./Route/teacherRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
mongoose
  .connect(
    "mongodb+srv://Sunday:Database1234@cluster0.bcdps.mongodb.net/HYMAN?retryWrites=true&w=majority&appName=Cluster0 "
  )
  .then((db) => {
    console.log("mongodb is connected successfully");
  })
  .catch((e) => {
    console.log("mongo error", e);
  });
// app.use(express.json());
// app.use("/auth", authRoutes);
// app.use("/parent", parentRoutes);
// app.use("teacher", teacherRoutes);
// app.use("pta", ptaRoutes);
app.use("/api/school", schoolRouter);
const PORT = process.env.Port || 3000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

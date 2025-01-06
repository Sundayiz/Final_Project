const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// dotenv.config();

const app = express();

// app.use(express.json());
// app.use("/api/auth",require("./routes/auth"));
// app.use("api/parent",require("./routes/parent"));
// app.use("/api/subjects", require("./routes/subject"));

connectDB();
const PORT = process.env.Port || 5000;
app.listen(PORT, () => console.log("server is running on port ${PORT}"));

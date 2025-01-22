const express = require("express");
const dotenv = require("dotenv").config(); // Corrected dotenv initialization
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const schoolRouter = require("./router/school.router");

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Sunday:Database1234@cluster0.bcdps.mongodb.net/HYMAN?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true } // Ensure compatibility options are set
  )
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if the database fails to connect
  });

// Route setup
app.use("/api/school", schoolRouter);

// Define the server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

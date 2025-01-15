const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI ||
      "mongodb+srv://Sunday:Database1234@cluster0.bcdps.mongodb.net/HYMAN?retryWrites=true&w=majority&appName=Cluster0 ";
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongoURI.options);
    console.log("MongoDB conneccted successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;

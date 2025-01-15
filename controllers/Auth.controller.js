const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Parent = require("../models/parent");
const Teacher = require("../models/teacher");
const Admin = require("../models/admin");

exports.signup = async (req, res) => {
  const { name, email, password, role, school } = req.body;
  try {
    if (!["parent", "teacher", "admin"].includes(role)) {
      return res.status(400).json({ message: "invalid role specified" });
    }
    //Check if user already exists
    let existingUser;
    if (role === "parent") existingUser = await Parent.findOne({ email });
    else if (role === "teacher")
      existingUser = await Teacher.findOne({ email });
    else if (role === "admin") existingUser = await Admin.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    //create user based on role
    let newUser;
    if (role === "parent") {
      newUser = new Parent({ name, email, password: hashedPassword });
    } else if (role === "teacher") {
      if (!school)
        return res
          .status(400)
          .json({ message: "School is required for teachers" });
      newUser = new Teacher({ name, email, password: hashedPassword, school });
    } else if (role === "admin") {
      newUser = new Admin({ name, email, password: hashedPassword });
    }
    await newUser.save();

    res
      .status(201)
      .json({
        message: `${
          role.charAt(0).toUpperCase() + role.slice(1)
        } signed up successfully} signed up successfully`,
        user: newUser,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!["parent", "teacher", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }
    //find user based on role
    let user;
    if (role === "parent") user = await Parent.findOne({ email });
    else if (role === "teacher") user = await Teacher.findOne({ email });
    else if (role === "admin") user = await Admin.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, message: "Login successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  try {
    res.status(200).json({ message: "Logoutsuccessfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

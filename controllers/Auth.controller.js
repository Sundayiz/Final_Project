const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Parent = require("../models/parent");
const Teacher = require("../models/teacher");
exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user;
    if (role === "parent") user = await Parent.findOne({ email });
    else if (role === "teacher") user = await Teacher.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "invalid credentials" });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const formidable = require("formidable");
const School = require("../models/school.model");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  registerSchool: async (req, res) => {
    try {
      const form = new formidable.IncomingForm({
        multiples: true,
        keepExtensions: true,
      });

      const imagePath = path.join(__dirname, process.env.SCHOOL_IMAGE_PATH);
      if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
      }

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Error parsing the form data." });
        }

        if (!files || !files.image) {
          return res.status(400).json({
            success: false,
            message: "No image file uploaded.",
          });
        }

        const existingSchool = await School.findOne({ email: fields.email });
        if (existingSchool) {
          return res.status(409).json({
            success: false,
            message: "Email is already registered.",
          });
        }

        const photo = files.image;
        const originalFilename = photo.originalFilename.replace(/\s/g, "");
        const filepath = path.join(imagePath, originalFilename);

        fs.copyFileSync(photo.filepath, filepath);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(fields.password, salt);

        const newSchool = new School({
          school_name: fields.school_name,
          email: fields.email,
          owner_name: fields.owner_name,
          school_image: originalFilename,
          password: hashedPassword,
        });

        const savedSchool = await newSchool.save();
        res.status(201).json({
          success: true,
          data: savedSchool,
          message: "School registered successfully.",
        });
      });
    } catch (error) {
      console.error("Error in registerSchool:", error);
      res.status(500).json({
        success: false,
        message: "School registration failed.",
      });
    }
  },

  loginSchool: async (req, res) => {
    try {
      const school = await School.findOne({ email: req.body.email });
      if (!school) {
        return res.status(401).json({
          success: false,
          message: "Email is not registered.",
        });
      }

      const isAuth = await bcrypt.compare(req.body.password, school.password);
      if (!isAuth) {
        return res.status(401).json({
          success: false,
          message: "Password is incorrect.",
        });
      }

      const token = jwt.sign(
        {
          id: school._id,
          owner_name: school.owner_name,
          school_name: school.school_name,
          image_url: school.school_image,
          role: "SCHOOL",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res
        .header("Authorization", token)
        .status(200)
        .json({
          success: true,
          message: "Login successful.",
          token,
          user: {
            id: school._id,
            owner_name: school.owner_name,
            school_name: school.school_name,
            image_url: school.school_image,
            role: "SCHOOL",
          },
        });
    } catch (error) {
      console.error("Error in loginSchool:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error [SCHOOL LOGIN].",
      });
    }
  },

  getAllSchools: async (req, res) => {
    try {
      const schools = await School.find().select("-password -email -createdAt");
      res.status(200).json({
        success: true,
        message: "Successfully fetched all schools.",
        schools,
      });
    } catch (error) {
      console.error("Error in getAllSchools:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error [ALL SCHOOL DATA].",
      });
    }
  },

  getSchoolOwnData: async (req, res) => {
    try {
      const school = await School.findById(req.user.id);
      if (!school) {
        return res.status(404).json({
          success: false,
          message: "School not found.",
        });
      }

      res.status(200).json({ success: true, school });
    } catch (error) {
      console.error("Error in getSchoolOwnData:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error [OWN SCHOOL DATA].",
      });
    }
  },

  updateSchool: async (req, res) => {
    try {
      const form = new formidable.IncomingForm({
        multiples: true,
        keepExtensions: true,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Error parsing form data." });
        }

        const school = await School.findById(req.user.id);
        if (!school) {
          return res.status(404).json({
            success: false,
            message: "School not found.",
          });
        }

        if (files && files.image) {
          const photo = files.image;
          const filepath = path.join(
            __dirname,
            process.env.SCHOOL_IMAGE_PATH,
            photo.originalFilename.replace(/\s/g, "")
          );

          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }

          fs.copyFileSync(photo.filepath, filepath);
          school.school_image = photo.originalFilename;
        }

        Object.keys(fields).forEach((field) => {
          school[field] = fields[field];
        });

        await school.save();
        res.status(200).json({
          success: true,
          message: "School updated successfully.",
          school,
        });
      });
    } catch (error) {
      console.error("Error in updateSchool:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error [UPDATE SCHOOL].",
      });
    }
  },
};

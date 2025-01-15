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
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        const photo = files.image[0];
        let filepath = photo.filepath;
        let originalfilename = photo.originalFilename.replace(" ", "");
        let newPath = path.join(
          __dirname,
          process.env.SCHOOL_IMAGE_PATH,
          originalfilename
        );

        let photoData = fs.readFileSync(filepath);
        fs.writeFileSync(newPath, photoData);

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(fields.password[0], salt);
        const newSchool = new School({
          school_name: fields.school_name[0],
          email: fields.email[0],
          owner_name: fields.owner_name,
          password: hashedPassword,
        });
        const savedSchool = await newSchool.save();
        res.status(200).json({
          success: true,
          data: savedSchool,
          message: "School is registered sucessfully",
        });
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "School Registion falled" });
    }
  },
  loginSchool: async (req, res) => {
    try {
      const school = await School.findOne({ email: req.body.email });
      if (school) {
        const isAuth = bcrypt.compareSync(req.body.password, school.password);
        if (isAuth) {
          const jwtSecret = process.env.JWT_SECRET;
          const token = jwt.sign(
            {
              id: school._id,
              schoolId: school._id,
              owner_name: school.owner_name,
              school_name: school.school_name,
              image_url: school.school_image,
              role: "SCHOOL",
            },
            jwtSecret
          );
          res.header("Authorization", token);
          res.status(200).json({
            success: true,
            message: "Success Login.",
            user: {
              id: school._id,
              owner_name: school.owner_name,
              school_name: school.school_name,
              image_url: school.school_image,
              role: "SCHOOL",
            },
          });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Password is Incorrect." });
        }
      } else {
        res
          .status(401)
          .json({ success: false, message: "Email is not registered." });
      }
    } catch (error) {
      res.status(500)({
        success: false,
        message: "internal server Error[SCHOOL LOGIN]",
      });
    }
  },
  getallSchools: async (req, res) => {
    try {
      const schools = await School.findOne().select([
        "-password",
        "-_id",
        "-email",
        "-owner_name",
        "-createdAt",
      ]);
      res.status(200).json({
        success: true,
        message: "Success in fetching all school",
        schools,
      });
    } catch (error) {
      res.ststus(500).json({
        success: false,
        message: "Internal server error[ALL SCHOOL DATA].",
      });
    }
  },
  getSchoolOwnData: async (req, res) => {
    try {
      const id = req.user.id;
      const school = await School.findOne({ _id: id });
      if (school) {
        res.status(200).json({ success: true, school });
      } else {
        res.stsatus(404).json({
          success: false,
          message: "School not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error[OWN SCHOOL DATA].",
      });
    }
  },
  updateSchool: async (req, res) => {
    try {
      const _id = req.user.id;
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        const school = await School.findOne({ _id: id });
        if (files.image) {
          const photo = files.image[0];
          let filepath = photo.filepath;
          let originalfilename = photo.originalFilename.replace(" ", "");
          if (school.school_image) {
            let oldImagePath = path.join(
              __dirname,
              process.env.SCHOOL_IMAGE_PATH,
              school.school_image
            );
            if (fs.existsSync(oldImagePath)) {
              fs.unlink(oldImagePath, (err) => {
                if (err) console.log("Error deleting old image.", err);
              });
            }
          }

          let newPath = path.join(
            __dirname,
            process.env.SCHOOL_IMAGE_PATH,
            originalfilename
          );
          let photoData = fs.readFileSync(filepath);
          fs.writeFileSync(newPath, photoData);
          Object.keys(fields).forEach((field) => {
            school[field] = fields[fields][0];
          });
          await school.savs();
          res.status(200).json({
            success: true,
            message: "school updated successfully.",
            school,
          });
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "School Registion falled" });
    }
  },
};

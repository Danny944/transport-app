const models = require("../models/index");
const Driver = models.driverModel;
const utils = require("../utils");
const fs = require("fs");
const { hashPassword, comparePassword } = utils.hash;
const { generateToken } = utils.jwt;
const { driverSignUPValidator, logInValidator, locationValidator } =
  utils.validator;
const { sendSignUpEmail } = utils.nodemailer;
const { cloudinaryUploadImage } = utils.cloudinary;

//signup
const driverSignUp = async (req, res) => {
  try {
    const { error, value } = driverSignUPValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid Request" });
    }
    const { email, password } = value;
    //Check if a user is already registered in the database
    const existingUser = await Driver.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    //hash password
    const hashedPassword = await hashPassword(password);

    //replace the plain password with the hash
    value.password = hashedPassword;

    const token = generateToken(value);

    const newDriver = await Driver.create(value);
    if (!newDriver) {
      return res.status(400).json({ error: "Sign up failed" });
    }
    sendSignUpEmail(email);

    //respond to the front-end with these details
    res.status(201).json({
      DriverDetails: {
        id: newDriver._id,
        firstname: newDriver.first_name,
        lastname: newDriver.last_name,
        email: newDriver.email,
        car_type: newDriver.car_type,
        max_passengers: newDriver.max_passengers,
        phone_number: newDriver.phone_number,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.message);
  }
};

//login
const driverLogIn = async (req, res) => {
  try {
    const { error, value } = logInValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid Request" });
    }

    const { email, password } = value;

    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isPasswordValid = await comparePassword(password, driver.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = generateToken(value);

    res.status(200).json({
      DriverDetails: {
        id: driver._id,
        firstname: driver.first_name,
        lastname: driver.last_name,
        email: driver.email,
        car_type: driver.car_type,
        max_passengers: driver.max_passengers,
        phone_number: driver.phone_number,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.message);
  }
};

//get verified
const uploadLicense = async (req, res) => {
  try {
    const { email } = req.user;
    const { path } = req.file;
    const { url } = await cloudinaryUploadImage(path, "images");
    if (!url) {
      return res.status(400).json({ error: "Failed to upload image" });
    }
    fs.unlinkSync(path);
    const updateLink = await Driver.findOneAndUpdate(
      { email: email },
      { driver_license: url, verificationStatus: "awaitingVerification" },
      { new: true }
    );
    if (!updateLink) {
      return res.status(400).json({ error: "Failed to upload image" });
    }
    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

//check verification status
const checkVerificationStatus = async (req, res) => {
  try {
    const { email } = req.user;
    const driver = await Driver.findOne({ email });
    res.status(200).json({ verificationStatus: driver.verificationStatus });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

//allow-location-tracking and populate location
const allowLocationTracking = async (req, res) => {
  try {
    const { error, value } = locationValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid Request" });
    }
    const { longitude, latitude } = value;
    const { email } = req.user;
    const driver = await Driver.findOneAndUpdate(
      { email },
      { location: { type: "Point", coordinates: [longitude, latitude] } },
      { new: true }
    );

    if (!driver) {
      return res
        .status(400)
        .json({ error: "An error occured updating location" });
    }
    res
      .status(200)
      .json({ message: " Location Update successful you are ready to go!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

//get-user-details

module.exports = {
  driverSignUp,
  driverLogIn,
  uploadLicense,
  checkVerificationStatus,
  allowLocationTracking,
};

const models = require("../models/index");
const Driver = models.driverModel;
const utils = require("../utils");
const { hashPassword, comparePassword } = utils.hash;
const { generateToken } = utils.jwt;
const { driverSignUPValidator } = utils.validator;
const { sendSignUpEmail } = utils.nodemailer;

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

//allow-location-tracking

//get-user-details

module.exports = { driverSignUp };

const models = require("../models/index");
const Student = models.studentModel;
const utils = require("../utils");
const { hashPassword, comparePassword } = utils.hash;
const { generateToken } = utils.jwt;
const { studentSignUpValidator, logInValidator } = utils.validator;
const { sendSignUpEmail } = utils.nodemailer;

//sign up
const studentSignUp = async (req, res) => {
  try {
    const { error, value } = studentSignUpValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid Request" });
    }
    const { email, password } = value;

    //Check if a user is already registered in the database
    const existingUser = await Student.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    //hash password
    const hashedPassword = await hashPassword(password);

    //replace the plain password with the hash
    value.password = hashedPassword;

    const token = generateToken(value);
    const newStudent = await Student.create(value);
    if (!newStudent) {
      return res.status(400).json({ error: "Sign up failed" });
    }

    sendSignUpEmail(email);

    //respond to the front-end with these details
    res.status(201).json({
      StudentDetails: {
        _id: newStudent._id,
        firstname: newStudent.first_name,
        lastname: newStudent.last_name,
        email: newStudent.email,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.message);
  }
};

//login
const studentLogin = async (req, res) => {
  try {
    const { error, value } = logInValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid Request" });
    }

    const { email, password } = value;

    const findStudent = await Student.findOne({ email });
    if (!findStudent) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isMatch = await comparePassword(password, findStudent.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = generateToken(value);

    res.status(200).json({
      StudentDetails: {
        _id: findStudent._id,
        firstname: findStudent.first_name,
        lastname: findStudent.last_name,
        email: findStudent.email,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.message);
  }
};

module.exports = { studentSignUp, studentLogin };

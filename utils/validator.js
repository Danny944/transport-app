const Joi = require("joi");

const driverSignUPValidator = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  car_type: Joi.string().required(),
  password: Joi.string().required(),
  phone_number: Joi.string().required(),
  max_passengers: Joi.number().required(),
});

const studentSignUpValidator = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const logInValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const locationValidator = Joi.object({
  longitude: Joi.number().min(-180).max(180).required(),
  latitude: Joi.number().min(-90).max(90).required(),
});

module.exports = {
  driverSignUPValidator,
  studentSignUpValidator,
  logInValidator,
  locationValidator,
};

const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const { authMiddleware } = middlewares.auth;
const driverController = controllers.driverController;

const router = express.Router();

router.post("/driver/sign-up", driverController.driverSignUp);

module.exports = router;

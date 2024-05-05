const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const { authMiddleware } = middlewares.auth;
const studentController = controllers.studenController;

const router = express.Router();

router.post("/student/sign-up", studentController.studentSignUp);

module.exports = router;

const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const { authMiddleware } = middlewares.auth;
const studentController = controllers.studentController;

const router = express.Router();

router.post("/student/sign-up", studentController.studentSignUp);
router.post("/student/log-in", studentController.studentLogin);
router.get(
  "/student/find-drivers",
  authMiddleware,
  studentController.findDrivers
);

module.exports = router;

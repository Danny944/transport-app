const express = require("express");
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const utils = require("../utils");
const { uploadImage } = utils.multer;
const { authMiddleware } = middlewares.auth;
const driverController = controllers.driverController;

const router = express.Router();

router.post("/driver/sign-up", driverController.driverSignUp);
router.post("/driver/log-in", driverController.driverLogIn);
router.put(
  "/driver/upload-license",
  authMiddleware,
  uploadImage.single("image"),
  driverController.uploadLicense
);
router.get(
  "/driver/check-verification-status",
  authMiddleware,
  driverController.checkVerificationStatus
);
router.put(
  "/driver/allow-location-tracking",
  authMiddleware,
  driverController.allowLocationTracking
);

module.exports = router;

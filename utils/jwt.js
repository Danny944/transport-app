const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate a JWT token
function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRETKEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
}

// Verify a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    return decoded;
  } catch (error) {
    // Handle token verification error
    console.error("Token verification failed:", error.message);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};

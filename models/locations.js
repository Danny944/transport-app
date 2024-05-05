const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  location_name: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
    unique: true,
  },
  latitude: {
    type: String,
    required: true,
  },
});

const locations = mongoose.model("locations", locationSchema);

module.exports = locations;

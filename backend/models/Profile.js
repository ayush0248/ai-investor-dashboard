const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  mobile: String,
  dob: String,
  address: String,
  website: String,
  aboutMe: String,
  aadhaar: String,
  pan: String,
  upiId: String,
  bankAccount: String,
  ifscCode: String,
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;

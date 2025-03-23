require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Check if MONGO_URI is properly set
if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not set in .env file");
  process.exit(1);
}

// ✅ Firebase Admin SDK Initialization
const serviceAccountPath = "./firebaseServiceAccountKey.json";
if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Error: Firebase service account key file is missing");
  process.exit(1);
}

try {
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("✅ Firebase Admin SDK initialized");
} catch (error) {
  console.error("❌ Firebase Admin SDK Initialization Error:", error);
  process.exit(1);
}

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ Profile Schema
const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  dob: String,
  mobileNumber: String,
  address: String,
  aadhaarNumber: String,
  panCardNumber: String,
  bankAccountNumber: String,
  ifscCode: String,
});

const Profile = mongoose.model("Profile", profileSchema);

// ✅ Middleware to Verify Firebase Token
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("❌ Firebase Token Verification Error:", error);
    return res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};

// ✅ Fetch User Profile (No need to pass email, it's in the token)
app.get("/api/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const email = req.user.email; // Extract from Firebase token
    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("❌ Error Fetching Profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ✅ Save or Update Profile
app.post("/api/profile", verifyFirebaseToken, async (req, res) => {
  try {
    const email = req.user.email; // Extract from Firebase token
    const { firstName, lastName, dob, mobileNumber, address, aadhaarNumber, panCardNumber, bankAccountNumber, ifscCode } = req.body;

    let profile = await Profile.findOne({ email });

    if (profile) {
      // Update existing profile
      await Profile.updateOne(
        { email },
        { firstName, lastName, dob, mobileNumber, address, aadhaarNumber, panCardNumber, bankAccountNumber, ifscCode }
      );
      return res.json({ message: "Profile updated successfully" });
    } else {
      // Create new profile
      profile = new Profile({ email, firstName, lastName, dob, mobileNumber, address, aadhaarNumber, panCardNumber, bankAccountNumber, ifscCode });
      await profile.save();
      return res.status(201).json({ message: "Profile created successfully" });
    }
  } catch (error) {
    console.error("❌ Error Saving Profile:", error);
    res.status(500).json({ error: "Failed to save profile" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

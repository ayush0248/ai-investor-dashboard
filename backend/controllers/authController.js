import admin from "../config/firebase.js";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { uid, email, name } = req.body;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, name });
      await user.save();
    }

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

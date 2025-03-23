const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Reference to Firebase Auth user
  holdings: [
    {
      symbol: String,
      shares: Number,
      price: Number,
      value: Number,
      gainLoss: Number,
    },
  ],
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;

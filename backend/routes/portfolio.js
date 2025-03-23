const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

// Save or update user's portfolio
router.post("/save", async (req, res) => {
  const { userId, holdings } = req.body;

  try {
    let portfolio = await Portfolio.findOne({ userId });

    if (portfolio) {
      portfolio.holdings = holdings; // Update existing portfolio
    } else {
      portfolio = new Portfolio({ userId, holdings });
    }

    await portfolio.save();
    res.json({ message: "Portfolio saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving portfolio" });
  }
});

// Fetch user's portfolio
router.get("/:userId", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.params.userId });

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: "Error fetching portfolio" });
  }
});

module.exports = router;

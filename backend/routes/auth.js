const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const { User } = require("../models");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ error: "User already registered" });

    // Generate wallet
    const newWallet = ethers.Wallet.createRandom();

    // Save user with hashed password
    const newUser = await User.create({
      email,
      passwordHash: password,
      walletAddress: newWallet.address,
      privateKey: newWallet.privateKey, // ⚠️ Optional: better to encrypt in real scenarios
    });

    res.status(201).json({ 
      message: "User registered", 
      user: {
        email: newUser.email,
        walletAddress: newUser.walletAddress
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

module.exports = router;

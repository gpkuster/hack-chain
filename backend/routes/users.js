const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const { User } = require("../models");

// POST /api/user/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, lastName, age } = req.body;

    if (!email)
      return res.status(400).json({ error: "Email required" });

    if (!password)
      return res.status(400).json({ error: "Password required" });

    if (!name)
      return res.status(400).json({ error: "Name required" });

    if (!lastName)
      return res.status(400).json({ error: "Last name required" });

    if (!age)
      return res.status(400).json({ error: "Age required" });

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ error: "User already registered" });

    // Generate wallet
    const newWallet = ethers.Wallet.createRandom();

    // Save user with hashed password
    const newUser = await User.create({
      name,
      lastName,
      age,
      email,
      passwordHash: password,
      walletAddress: newWallet.address,
      privateKey: newWallet.privateKey, // ⚠️ Optional: better to encrypt in real scenarios
    });

    res.status(201).json({ 
      message: "User registered", 
      user: {
        name: newUser.name,
        lastName: newUser.lastName,
        age: newUser.age,
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

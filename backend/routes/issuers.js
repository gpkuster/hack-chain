const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const { Issuer } = require("../models");

// POST /api/issuer/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email)
      return res.status(400).json({ error: "Email required" });

    if (!password)
      return res.status(400).json({ error: "Password required" });

    if (!name)
      return res.status(400).json({ error: "Company name required" });

    // Check if issuer already exists
    const existingByEmail = await Issuer.findOne({ where: { email } });
    if (existingByEmail)
      return res.status(409).json({ error: "Issuer already registered with that email" });

    const existingByName = await Issuer.findOne({ where: { name } });
    if (existingByName)
      return res.status(409).json({ error: "Issuer already registered with that name" });

    // Generate wallet
    const newWallet = ethers.Wallet.createRandom();

    // Save issuer with hashed password
    const newIssuer = await Issuer.create({
      name,
      email,
      passwordHash: password,
      walletAddress: newWallet.address,
      privateKey: newWallet.privateKey, // ⚠️ Optional: better to encrypt in real scenarios
    });

    res.status(201).json({ 
      message: "Issuer registered", 
      issuer: {
        email: newIssuer.email,
        name: newIssuer.name,
        walletAddress: newIssuer.walletAddress
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register issuer" });
  }
});

module.exports = router;
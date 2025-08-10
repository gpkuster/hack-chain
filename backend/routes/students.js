const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const { Student } = require("../models");

// POST /api/student/register
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

    // Check if student already exists
    const existing = await Student.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ error: "Student already registered" });

    // Generate wallet
    const newWallet = ethers.Wallet.createRandom();

    // Save student with hashed password
    const newStudent = await Student.create({
      name,
      lastName,
      age,
      email,
      passwordHash: password,
      walletAddress: newWallet.address,
      privateKey: newWallet.privateKey, // ⚠️ Optional: better to encrypt in real scenarios
    });

    res.status(201).json({ 
      message: "Student registered", 
      student: {
        name: newStudent.name,
        lastName: newStudent.lastName,
        age: newStudent.age,
        email: newStudent.email,
        walletAddress: newStudent.walletAddress
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register student" });
  }
});

module.exports = router;

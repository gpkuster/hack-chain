const express = require("express");
const router = express.Router();
const { Recruiter } = require("../models");

// POST /api/recruiter/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, lastName } = req.body;

    if (!email)
      return res.status(400).json({ error: "Email required" });

    if (!password)
      return res.status(400).json({ error: "Password required" });

    if (!name)
      return res.status(400).json({ error: "Recruiter's mame required" });

    if (!lastName)
      return res.status(400).json({ error: "Recruiter's last name required" });

    // Check if recruiter already exists
    const existingByEmail = await Recruiter.findOne({ where: { email } });
    if (existingByEmail)
      return res.status(409).json({ error: "Recruiter already registered with that email" });

    // Save recruiter with hashed password
    const newRecruiter = await Recruiter.create({
      name,
      lastName,
      email,
      passwordHash: password,
    });

    res.status(201).json({ 
      message: "Recruiter registered", 
      recruiter: {
        email: newRecruiter.email,
        name: newRecruiter.name,
        lastName: newRecruiter.lastName,
        lastName: newRecruiter.lastName,
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register recruiter" });
  }
});

module.exports = router;
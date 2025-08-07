const bcrypt = require("bcrypt");

// TODO: Add functionality for counting how many students has a recruiter contacted

module.exports = (sequelize, DataTypes) => {
  const Recruiter = sequelize.define("Recruiter", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Hash password before saving
  Recruiter.beforeCreate(async (recruiter) => {
    const salt = await bcrypt.genSalt(10);
    recruiter.passwordHash = await bcrypt.hash(recruiter.passwordHash, salt);
  });

  return Recruiter;
};

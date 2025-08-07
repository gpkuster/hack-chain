const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Issuer = sequelize.define("Issuer", {
    name: {
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
    },
    walletAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    privateKey: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Hash password before saving
  Issuer.beforeCreate(async (issuer) => {
    const salt = await bcrypt.genSalt(10);
    issuer.passwordHash = await bcrypt.hash(issuer.passwordHash, salt);
  });

  return Issuer;
};

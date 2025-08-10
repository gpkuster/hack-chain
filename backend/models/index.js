const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = require("./students")(sequelize, DataTypes);
db.Issuer = require("./issuers")(sequelize, DataTypes);
db.Recruiter = require("./recruiters")(sequelize, DataTypes);

module.exports = db;

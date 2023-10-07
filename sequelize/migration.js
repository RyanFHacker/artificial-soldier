const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const queryInterface = sequelize.getQueryInterface();

queryInterface.addColumn("Subjects", "hailed", {
  type: Sequelize.DataTypes.BOOLEAN,
});

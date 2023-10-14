const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const queryInterface = sequelize.getQueryInterface();

// queryInterface.addColumn("Matches", "deny_id", {
//   type: Sequelize.DataTypes.BOOLEAN,
// });

queryInterface.changeColumn("matches", "deny_id", {
  type: Sequelize.DataTypes.STRING,
});
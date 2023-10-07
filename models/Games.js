const { Sequelize } = require("sequelize");

const sequelize = require("../config/database");

const Games = sequelize.define("games", {
  game_id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.TEXT,
  setcount: Sequelize.INTEGER,
  maxBounty: Sequelize.INTEGER,
  championBounty: Sequelize.INTEGER,
  enabled: Sequelize.DataTypes.BOOLEAN,
});

module.exports = Games;

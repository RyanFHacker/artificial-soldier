const { Sequelize } = require("sequelize");

const sequelize = require("../config/database");

const Matches = sequelize.define("matches", {
  match_id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  deny_id: Sequelize.STRING,
  results: Sequelize.TEXT,
  winner_id: Sequelize.DataTypes.STRING,
  winner_nickname: Sequelize.DataTypes.STRING,
  winner_points: Sequelize.DataTypes.INTEGER,
  bounty_points: Sequelize.DataTypes.INTEGER,
  loser_id: Sequelize.DataTypes.STRING,
  loser_nickname: Sequelize.DataTypes.STRING,
  loser_points: Sequelize.DataTypes.INTEGER,
  confirmed: Sequelize.DataTypes.BOOLEAN,
  game_id: Sequelize.DataTypes.STRING,
});

module.exports = Matches;

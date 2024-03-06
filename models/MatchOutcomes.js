const { Sequelize } = require("sequelize");

const sequelize = require("../config/database");

const MatchOutcomes = sequelize.define(
  "matchOutcomes",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    game_id: Sequelize.STRING,
    winner_sets: Sequelize.INTEGER,
    loser_sets: Sequelize.INTEGER,
    winner_points: Sequelize.INTEGER,
    loser_points: Sequelize.INTEGER,
    event_id: Sequelize.DataTypes.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = MatchOutcomes;

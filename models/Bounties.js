const { Sequelize } = require("sequelize");

const sequelize = require("../config/database");

const Bounties = sequelize.define(
  "bounties",
  {
    game_id: Sequelize.STRING,
    position: Sequelize.STRING,
    position_value: Sequelize.INTEGER,
    points: Sequelize.INTEGER,
  },
  {
    timestamps: false,
  }
);

module.exports = Bounties;

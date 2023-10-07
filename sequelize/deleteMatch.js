const Sequelize = require("sequelize");
const { DATE } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

const Matches = sequelize.define("matches", {
  match_id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
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

Matches.destroy({ where: { player0_id: "384240981521858561" } });

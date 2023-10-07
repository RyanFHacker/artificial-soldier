const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});
const MatchOutcomesModel = require("../models/MatchOutcomes");

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
  },
  {
    timestamps: false,
  }
);

MatchOutcomes.create({
  game_id: "ggst",
  winner_sets: 5,
  loser_sets: 4,
  winner_points: 30,
  loser_points: 25,
});

MatchOutcomes.create({
  game_id: "ggst",
  winner_sets: 5,
  loser_sets: 3,
  winner_points: 30,
  loser_points: 20,
});

MatchOutcomes.create({
  game_id: "ggst",
  winner_sets: 5,
  loser_sets: 2,
  winner_points: 30,
  loser_points: 15,
});

MatchOutcomes.create({
  game_id: "ggst",
  winner_sets: 5,
  loser_sets: 1,
  winner_points: 30,
  loser_points: 10,
});

MatchOutcomes.create({
  game_id: "ggst",
  winner_sets: 5,
  loser_sets: 0,
  winner_points: 30,
  loser_points: 5,
});

MatchOutcomes.create({
  game_id: "sf6",
  winner_sets: 3,
  loser_sets: 2,
  winner_points: 20,
  loser_points: 15,
});

MatchOutcomes.create({
  game_id: "sf6",
  winner_sets: 3,
  loser_sets: 1,
  winner_points: 20,
  loser_points: 10,
});

MatchOutcomes.create({
  game_id: "sf6",
  winner_sets: 3,
  loser_sets: 0,
  winner_points: 20,
  loser_points: 5,
});

MatchOutcomes.create({
  game_id: "xrd",
  winner_sets: 5,
  loser_sets: 4,
  winner_points: 30,
  loser_points: 25,
});

MatchOutcomes.create({
  game_id: "xrd",
  winner_sets: 5,
  loser_sets: 3,
  winner_points: 30,
  loser_points: 20,
});

MatchOutcomes.create({
  game_id: "xrd",
  winner_sets: 5,
  loser_sets: 2,
  winner_points: 30,
  loser_points: 15,
});

MatchOutcomes.create({
  game_id: "xrd",
  winner_sets: 5,
  loser_sets: 1,
  winner_points: 30,
  loser_points: 10,
});

MatchOutcomes.create({
  game_id: "xrd",
  winner_sets: 5,
  loser_sets: 0,
  winner_points: 30,
  loser_points: 5,
});

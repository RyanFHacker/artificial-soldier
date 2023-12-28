const Games = require("../models/Games");
const MatchOutcomes = require("../models/MatchOutcomes");
const Bounties = require("../models/Bounties");

let games = [
  {
    game_id: "sf6",
    name: "Street Fighter 6",
    setcount: 3,
    maxBounty: 30,
    enabled: true,
  },
  {
    game_id: "ggst",
    name: "Guilty Gear: Strive",
    setcount: 5,
    maxBounty: 45,
    championBounty: 15,
    enabled: true,
  },
  {
    game_id: "gb",
    name: "Granblue Fantasy Versus: Rising",
    setcount: 3,
    maxBounty: 30,
    enabled: true,
  },
  {
    game_id: "test",
    name: "test",
    setcount: 3,
    maxBounty: 30,
    enabled: true,
  },
];

async function createGames() {
  for (game of games) {
    Games.create({
      game_id: game.game_id,
      name: game.name,
      setcount: game.setcount,
      enabled: game.enabled,
    });
  }
}

async function createBounties() {
  for (game of games) {
    let bounty = game.maxBounty;
    for (let i = 0; i < 8; i++) {
      Bounties.create({
        game_id: game.game_id,
        position_value: i + 1,
        points: bounty,
      });
      if (i != 4 && i != 6) {
        bounty = bounty - 5;
      }
    }
  }
}
createGames();
createBounties();

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
  game_id: "gb",
  winner_sets: 3,
  loser_sets: 2,
  winner_points: 20,
  loser_points: 15,
});

MatchOutcomes.create({
  game_id: "gb",
  winner_sets: 3,
  loser_sets: 1,
  winner_points: 20,
  loser_points: 10,
});

MatchOutcomes.create({
  game_id: "gb",
  winner_sets: 3,
  loser_sets: 0,
  winner_points: 20,
  loser_points: 5,
});

MatchOutcomes.create({
  game_id: "test",
  winner_sets: 3,
  loser_sets: 2,
  winner_points: 20,
  loser_points: 15,
});

MatchOutcomes.create({
  game_id: "test",
  winner_sets: 3,
  loser_sets: 1,
  winner_points: 20,
  loser_points: 10,
});

MatchOutcomes.create({
  game_id: "test",
  winner_sets: 3,
  loser_sets: 0,
  winner_points: 20,
  loser_points: 5,
});

const sequelize = require("../config/database");

const SubjectsModel = require("../models/Subjects");
const MatchesModel = require("../models/Matches");

// SF6 comet 514162317769048084
SubjectsModel.update(
  { research_points: 105 },
  { where: { subject_id: "514162317769048084", game_id: "sf6" } }
);

//comet 20 (3-2) Dadmin 15
MatchesModel.update(
  {
    winner_points: 20,
    game_id: "sf6",
    results: "3-2",
    bounty_points: 30,
    loser_points: 15,
    confirmed: true,
  },
  { where: { match_id: "7fc109b4-8fd5-481a-88d7-a1af421fe5cd" } }
);

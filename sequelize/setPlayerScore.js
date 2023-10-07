const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const SubjectsModel = require("../models/Subjects");
const MatchesModel = require("../models/Matches");
const GamesModel = require("../models/Games");

// Switch Winner/Loser
//
// MatchesModel.update({ winner_id: "120364586535747584", winner_nickname: "Volume", loser_id: "314170353557569546", loser_nickname: "Debaser"}, { where: { match_id: "97107851-cf0d-498e-a5bd-486e7b070903" }})

// Confirm this mach
// MatchesModel.update({ winner_points: 30, bounty_points: 0, loser_points: 10, confirmed: true, results: "5 - 1" },{ where: { match_id: "a56da20f-eace-4fb2-9764-0d9056cb9d8f" } })

MatchesModel.destroy({
  where: { match_id: "059adf11-1130-4cf7-bec6-0071844eba2a" },
});

// Update set count
// MatchesModel.update({ results: "5 - 3", loser_points: 20 },{ where: { match_id:"2582f66f-f888-4dca-9c75-a3e2004ed058" } })

// GGST Complex 80pts
SubjectsModel.update(
  { research_points: 30 },
  { where: { subject_id: "384240981521858561", game_id: "sf6" } }
);

// GGST Volume 120pts
// SubjectsModel.update({ research_points: 120 },{ where: { subject_id: "120364586535747584", game_id: "ggst"} })

// GGST Debaser 70 to 55
// SubjectsModel.update({ research_points: 55 },{ where: { subject_id: "314170353557569546", game_id: "ggst"} })

//reset champions
// SubjectsModel.update({ champion: false },{ where: { champion: { [Sequelize.Op.or]: [null,true] } } })

// //set game champion bounties
// GamesModel.update({ championBounty: 0 },{ where: { game_id: "sf6"} })

// GamesModel.update({ championBounty: 15 },{ where: { game_id: "ggst"} })

// GamesModel.update({ championBounty: 0 },{ where: { game_id: "xrd"} })

sequelize.sync();

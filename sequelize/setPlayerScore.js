const Sequelize = require('sequelize');
const sequelize = require("../config/database");

const SubjectsModel = require("../models/Subjects");
const MatchesModel = require("../models/Matches");

// SF6 Dadmin 384240981521858561
SubjectsModel.update({ research_points: 60 },{ where: { subject_id: "384240981521858561", game_id: "sf6"} })


// SF6 comet 514162317769048084
SubjectsModel.update({ research_points: 55 },{ where: { subject_id: "514162317769048084", game_id: "sf6"} })

// SF6 Complex 235224381788389376
SubjectsModel.update({ research_points: 40 },{ where: { subject_id: "235224381788389376", game_id: "sf6"} })

// SF6 DukePhyliss 487077479421575171
SubjectsModel.update({ research_points: 15 },{ where: { subject_id: "487077479421575171", game_id: "sf6"} })

// SF6 meatstrocity 563549736389574677
SubjectsModel.update({ research_points: 5 },{ where: { subject_id: "563549736389574677", game_id: "sf6"} })

// GGST Project 82275520888188928
SubjectsModel.update({ research_points: 0 },{ where: { subject_id: "82275520888188928", game_id: "sf6"} })

/*---*/

// GGST Complex 235224381788389376
SubjectsModel.update({ research_points: 60 },{ where: { subject_id: "235224381788389376", game_id: "ggst"} })

// GGST BRX 292377709533986816
SubjectsModel.update({ research_points: 35 },{ where: { subject_id: "292377709533986816", game_id: "ggst"} })

// GGST Project 82275520888188928
SubjectsModel.update({ research_points: 20 },{ where: { subject_id: "82275520888188928", game_id: "ggst"} })

/*  SF6 Matches  */

// Complex 20 (3-0) Dadmin 5 
MatchesModel.update({ winner_points: 20, game_id: "sf6" }, { where: { match_id: "fedcc79d-a376-4968-91ad-a1e0d8f11c57" }})

// Dadmin 20 (3-0) meatstrocity 5
MatchesModel.update({ winner_points: 20, game_id: "sf6" }, { where: { match_id: "e7fa5d1e-3801-4c97-be54-6e5260c39cd0" }})

// Complex 20 (3-0) Dadmin 5 
MatchesModel.update({ winner_points: 20, game_id: "sf6" }, { where: { match_id: "c4122cb0-389f-42ee-a6ea-e68c66ab94d3" }})

// Dadmin 20 (3-1) DukePhyliss 10
MatchesModel.update({ winner_points: 20, game_id: "sf6" }, { where: { match_id: "e2b8dc41-6e6b-4cd9-bcfb-12b71821ce49" }})

//comet 20 (3-2) Dadmin 15
MatchesModel.update({ winner_points: 20, game_id: "sf6", results: "3-2", bounty_points: 0, loser_points: 15, confirmed: true }, { where: { match_id: "7aa2bd60-7dfb-4dea-bd3b-a92787cbcda6" }})

// comet 20 (3-0) DukePhyliss 5
MatchesModel.update({ winner_points: 20, game_id: "sf6" }, { where: { match_id: "03ee03b2-b144-4398-8451-48ad3a271e04" }})

// Complex 20 (3-2) comet 15
MatchesModel.update({ winner_points: 20, game_id: "sf6" }, { where: { match_id: "40a115e8-c912-4cf1-94f5-7b8e85e328ec" }})


/*  SF6 Matches  */

// Complex 30 (5-2) Project 15
MatchesModel.update({ winner_points: 30, results: "5-2", bounty_points: 0, loser_points: 15, confirmed: true, game_id: "ggst" }, { where: { match_id: "c4122cb0-389f-42ee-a6ea-e68c66ab94d3" }})

// Complex 30 (5-0) BRX 5
MatchesModel.update({ winner_points: 30, game_id: "ggst" }, { where: { match_id: "dce038cc-0479-41f0-aaaf-37df942b35c4" }})

// BRX 30 (5-2) Project 15
MatchesModel.update({ winner_points: 30, results: "5-1", bounty_points: 0, loser_points: 10, confirmed: true, game_id: "ggst" }, { where: { match_id: "3bcfe523-097d-4367-a5eb-bccab30f9258" }})

sequelize.sync()
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const SubjectsModel = require("../models/Subjects");
const MatchesModel = require("../models/Matches");
const GamesModel = require("../models/Games");
const Games = require("../models/Games");

// Switch Winner/Loser
//
// MatchesModel.update({ winner_id: "", winner_nickname: "", loser_id: "", loser_nickname: ""}, { where: { match_id: "" }})
// MatchesModel.update({ results:"", winner_points:, loser_points:, bounty_points:, confirmed: true}, { where: { match_id: "" }})

// Xrd
// Nano
// Nano 5 - 3 Novak, bounty 2nd: 40pts
// MatchesModel.update({ results:"5 - 3", winner_points: 30, loser_points: 20, bounty_points: 40, confirmed: true}, { where: { match_id: "b246e7eb-0650-446f-9102-04cf544226fa" }})
// b246e7eb-0650-446f-9102-04cf544226fa

// Scuff1e
// Scuff1e 5 - 1 Novak, bounty 2nd: 40pts
// MatchesModel.update({ results:"5 - 1", winner_points: 30, loser_points: 10, bounty_points: 40, confirmed: true}, { where: { match_id: "c17f64fa-c109-4263-8988-054121c750d6" }})
// c17f64fa-c109-4263-8988-054121c750d6

// Novak
// Novak 5 - 2 Skyking, no bounty
// MatchesModel.update({ results:"5 - 2", winner_points: 30, loser_points: 15, loser_nickname: "SkyKing", bounty_points: 0, confirmed: true}, { where: { match_id: "107010a0-6166-4880-a895-b0483267dcde" }})
// 107010a0-6166-4880-a895-b0483267dcde

// Project
// Project 3 - 1 Dadmin, 3rd place (20pt) bounty
// MatchesModel.update({ results:"3 - 1", winner_points: 20, loser_points: 10, bounty_points: 20, confirmed: true}, { where: { match_id: "b456c8bb-b80a-4114-b5e4-36358f6dd6e5" }})

// Scuffle
// Scuffle 3 - 0 Dadmin, 3rd place (20pt) bounty
// MatchesModel.update({ results:"3 - 0", winner_points: 20, loser_points: 5, bounty_points: 20, confirmed: true}, { where: { match_id: "3ad1cd54-f294-426b-9195-5011a81e14c6" }})

// Syberian
// Syberian 3 - 0 Judas, 2nd place (25pt) bounty
// MatchesModel.update({ results:"3 - 0", winner_points: 20, loser_points: 5, bounty_points: 25, confirmed: true}, { where: { match_id: "bff4b786-8012-4e72-b085-2c8ee6ee9214" }})

// 1st Volume matches
// Volume 5 - 2 BRX, no bounty
// MatchesModel.update({ results:"5 - 2", winner_points: 30, loser_points: 15, bounty_points: 0, confirmed: true}, { where: { match_id: "e77b94e4-1adf-4ddc-82a4-9c4aac526e0c" }})
// Volume 5 - 0 Project, no bounty
// MatchesModel.update({ results:"5 - 0", winner_points: 30, loser_points: 5, bounty_points: 0, confirmed: true}, { where: { match_id: "93e4da67-8304-4aa2-b846-aa49c8fc80cc" }})
// Volume 5 - 1 Judas, no bounty
// MatchesModel.update({ results:"5 - 1", winner_points: 30, loser_points: 10, bounty_points: 0, confirmed: true}, { where: { match_id: "80b2c5bb-3d78-41a0-8915-3c3f3dcd95ce" }})
// Volume 5 - 0 Scuff1e, no bounty
// MatchesModel.update({ results:"5 - 0", winner_points: 30, loser_points: 5, bounty_points: 0, confirmed: true}, { where: { match_id: "2348043a-aa48-4ac0-b5c0-4e9880330095" }})
// Volume 5 - 0 Nano
// 988fa8d4-a4e0-49bf-bfb1-e8b14d26ffd9
// MatchesModel.update({ results:"5 - 0", winner_id: "120364586535747584", winner_nickname: "Volume",winner_points: 30, loser_id: "105082222784028672", loser_nickname: "Nano", loser_points: 5, bounty_points: 0, confirmed: true, game_id: 'ggst'}, { where: { match_id: "bc99ed81-c6f9-45a6-9607-4ba0c30a19c0" }})

//Scuff1e matches
// Scuff1e 5 - 0 Nano, no bounty
// MatchesModel.update({ results:"5 - 0", winner_points: 30, loser_points: 5, bounty_points: 0, confirmed: true}, { where: { match_id: "038c91be-eaea-4d13-b0a8-a7ae7826e0ec" }})
// scuff 5 - 0 Judas, 4th place bounty
// MatchesModel.update({ results:"5 - 0", winner_points: 30, loser_points: 5, bounty_points: 30, confirmed: true}, { where: { match_id: "1a45643b-545a-4cca-92e2-d9a3fa112b14" }})

// BRX matches:
// BRX 5 - 4 Debaser, 3rd place bounty
// MatchesModel.update({ results:"5 - 4", winner_points: 30, loser_points: 25, bounty_points: 35, confirmed: true}, { where: { match_id: "d3287701-51f0-4bef-9dfc-f645a487fa7b" }})

// BRX 5 - 1 Judas, 4th place bounty
// MatchesModel.update({results: "5 - 1",winner_points: 30,loser_points: 10,bounty_points: 30,confirmed: true },{ where: { match_id: "54c64069-aad1-459d-a21f-af4ea6c2d1d9" } });

// [6:24 PM]Debaser (Firat): Debaser - syberian 5-1 strive
// MatchesModel.update({ results:"5 - 1", winner_id: "314170353557569546", winner_nickname: "Debaser",winner_points: 30, loser_id: "197123274281320448", loser_nickname: "Syberian", loser_points: 10, bounty_points: 0, confirmed: true, game_id: 'ggst'}, { where: { match_id: "bc99ed81-c6f9-45a6-9607-4ba0c30a19c0" }})

// Complex 5 - 0 Syberian, no bounty
// MatchesModel.update({ results:"5 - 0", winner_points: 30, loser_points: 5, bounty_points: 0, confirmed: true}, { where: { match_id: "b1524dbe-b2b5-4579-bb23-08c4420043be" }})
// // Complex 5 - 0 BRX, no bounty
// MatchesModel.update({ results:"5 - 0", winner_points: 30, loser_points: 5, bounty_points: 0, confirmed: true}, { where: { match_id: "fcfa3c57-0669-4fb2-b437-3bebc78996df" }})
// // Complex 5 - 2 Debaser, no bounty
// MatchesModel.update({ results:"5 - 2", winner_points:30, loser_points: 15, bounty_points: 0, confirmed: true}, { where: { match_id: "838286df-ae4d-4710-958e-e7b01533b7b5" }})
// // Complex 5 - 2 Volume, 1st place bounty
// MatchesModel.update({ results:"5 - 2", winner_points:30, loser_points: 15, bounty_points: 45, confirmed: true}, { where: { match_id: "65162014-85f8-4714-9509-6f76407ec7d8" }})
// // Complex 5 - 1 Scuffle, no bounty
// MatchesModel.update({ results:"5 - 1", winner_points:30, loser_points: 10, bounty_points: 0, confirmed: true}, { where: { match_id: "45f8819c-54a4-4c62-a598-00d4cbb5925a" }})
// // Complex 5 - 0 Judas, no bounty
// MatchesModel.update({ results:"5 - 0", winner_points:30, loser_points: 5, bounty_points: 0, confirmed: true}, { where: { match_id: "4a984290-02d7-46f5-92de-25e6bc9f8381" }})
MatchesModel.update({ bounty_points: 25 },{ where: { match_id:"9cfaf182-0199-402a-a4c3-dc9f84e14662" } })

async function checkScore(playerId, game_id) {
  const wins = await MatchesModel.findAll({
    where: { winner_id: playerId, game_id: game_id },
  });
  const losses = await MatchesModel.findAll({
    where: { loser_id: playerId, game_id: game_id },
  });

  let win_points = 0;
  let loss_points = 0;
  // loop though wins and add points
  for (win of wins) {
    win_points += win.winner_points + win.bounty_points;
  }
  for (loss of losses) {
    loss_points += loss.loser_points;
  }
  console.log(win_points + loss_points);
}
async function setScores() {
  const games = await GamesModel.findAll();
  games.forEach(async (game) => {
    const subjects = await SubjectsModel.findAll({
      where: { game_id: game.game_id },
    });
    subjects.forEach(async (subject) => {
      const wins = await MatchesModel.findAll({
        where: { winner_id: subject.subject_id, game_id: game.game_id },
      });
      const losses = await MatchesModel.findAll({
        where: { loser_id: subject.subject_id, game_id: game.game_id },
      });

      let win_points = 0;
      let loss_points = 0;
      for (win of wins) {
        win_points += win.winner_points + win.bounty_points;
      }
      for (loss of losses) {
        loss_points += loss.loser_points;
      }
      const research_points = win_points + loss_points;

      const updateSubject = await SubjectsModel.findOne({
        where: { subject_id: subject.subject_id, game_id: game.game_id },
      });

      updateSubject.update({ research_points: research_points });
    });
  });
}
setScores();

// Remove a match
// MatchesModel.destroy({
//   where: { match_id: "059adf11-1130-4cf7-bec6-0071844eba2a" },
// });

// Update set count
// MatchesModel.update({ results: "3 - 0", loser_points: 5, bounty_points: 25 },{ where: { match_id:"9cfaf182-0199-402a-a4c3-dc9f84e14662" } })

// GGST Complex 80pts
// SubjectsModel.update(
//   { research_points: 30 },
//   { where: { subject_id: "384240981521858561", game_id: "sf6" } }
// );

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

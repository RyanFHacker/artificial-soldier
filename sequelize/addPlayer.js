const SubjectsModel = require("../models/Subjects");


async function createSubject(subject_id, nickname, game_id) {

await SubjectsModel.create({
    subject_id: subject_id,
    research_points: 0,
    nickname: nickname,
    game_id: game_id,
  });
}

createSubject("1064421802618658836", "Artificial", "test")
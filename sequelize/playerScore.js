const SubjectsModel = require("../models/Subjects");

async function updateSubject(subject_id, game_id, rank) {

const updateSubject = await SubjectsModel.findOne({
    where: { subject_id: subject_id, game_id: game_id },
  });

  updateSubject.update({ rank: rank });}


//   setScore("1064421802618658836", 100, "test", 1)
//   setScore("384240981521858561", 0, "test", 2)
updateSubject("282753584829956096", "sf6", "")
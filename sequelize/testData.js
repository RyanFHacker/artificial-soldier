const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

const Subjects = sequelize.define("subjects", {
  subject_id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  research_points: Sequelize.INTEGER,
  rank: Sequelize.INTEGER,
  nickname: Sequelize.STRING,
});

Subjects.create({
  subject_id: "177522099294830593",
  research_points: 100,
  rank: 1,
  nickname: "Nickname",
});

Subjects.create({
  subject_id: "1064421802618658836",
  research_points: 90,
  rank: 3,
  nickname: "Nickname",
});

Subjects.create({
  subject_id: "384240981521858561",
  research_points: 80,
  rank: 2,
  nickname: "Nickname",
});

Subjects.create({
  subject_id: "629388072550793296",
  research_points: 70,
  rank: 2,
  nickname: "Nickname",
});

Subjects.create({
  subject_id: "91411801706594304",
  research_points: 60,
  rank: 2,
  nickname: "Nickname",
});

Subjects.create({
  subject_id: "154744841744416768",
  research_points: 50,
  rank: 2,
  nickname: "Nickname",
});

Subjects.create({
  subject_id: "159826037792964608",
  research_points: 50,
  rank: 2,
  nickname: "Nickname",
});

Subjects.create({
  subject_id: "550613223733329920",
  research_points: 50,
  rank: 2,
  nickname: "Nickname",
});

Subjects.create({
  subject_id: "82275520888188928",
  research_points: 50,
  rank: 2,
  nickname: "Nickname",
});

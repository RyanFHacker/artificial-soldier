const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Subjects = sequelize.define('subjects', {
	subject_id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
});


Subjects.create({
	subject_id: "177522099294830593",
	research_points: 100,
	rank: 1
});

Subjects.create({
	subject_id: "1064421802618658836",
	research_points: 40,
	rank: 3
});

Subjects.create({
	subject_id: "384240981521858561",
	research_points: 60,
	rank: 2
});

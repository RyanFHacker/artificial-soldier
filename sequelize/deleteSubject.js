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
	nickname: Sequelize.STRING,
});

const dadminId = "384240981521858561"
const soldierId = "1064421802618658836"

Subjects.destroy({ where: { subject_id: dadminId} })

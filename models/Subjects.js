const { Sequelize } = require("sequelize");

const sequelize = require("../config/database");

const Subjects = sequelize.define('subjects', {
	subject_id: {
		type: Sequelize.STRING,
	},
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
	nickname: Sequelize.STRING,
	game_id: Sequelize.STRING
});

module.exports = Subjects;

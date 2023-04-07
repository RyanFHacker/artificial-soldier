const { Sequelize } = require("sequelize");

const sequelize = require("../config/database");

const Subjects = sequelize.define('subjects', {
	subject_id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
	confirmed: Sequelize.DataTypes.BOOLEAN,
	nickname: Sequelize.STRING
});

module.exports = Subjects;

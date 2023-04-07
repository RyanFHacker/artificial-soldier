const { Sequelize } = require("sequelize");

const sequelize = require("../config/database");

const Matches = sequelize.define('matches', {
	match_id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	results: Sequelize.TEXT,
	player0_id: Sequelize.DataTypes.STRING,
	player0_nickname: Sequelize.DataTypes.STRING,
	player1_id: Sequelize.DataTypes.STRING,
	player1_nickname: Sequelize.DataTypes.STRING,
	confirmed: Sequelize.DataTypes.BOOLEAN
});

module.exports = Matches;

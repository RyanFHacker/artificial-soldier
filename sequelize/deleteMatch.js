const Sequelize = require('sequelize');
const { DATE } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

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

Matches.destroy({ where: { player0_id: "384240981521858561"}})
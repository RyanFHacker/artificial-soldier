const Sequelize = require('sequelize');

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

const Subjects = sequelize.define('subjects', {
	subject_id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
	confirmed: Sequelize.DataTypes.BOOLEAN,
	nickname: Sequelize.STRING,
});

const Channels = sequelize.define('channels', {
	channel_id: Sequelize.INTEGER,

})

sequelize.sync()

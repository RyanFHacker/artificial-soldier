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
	winner_id: Sequelize.DataTypes.STRING,
	winner_nickname: Sequelize.DataTypes.STRING,
	winner_points: Sequelize.DataTypes.INTEGER,
	bounty_points: Sequelize.DataTypes.INTEGER,
	loser_id: Sequelize.DataTypes.STRING,
	loser_nickname: Sequelize.DataTypes.STRING,
	loser_points: Sequelize.DataTypes.INTEGER,
	confirmed: Sequelize.DataTypes.BOOLEAN,
	game_id: Sequelize.DataTypes.STRING
});

const Subjects = sequelize.define('subjects', {
	subject_id: {
		type: Sequelize.STRING,
	},
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
	nickname: Sequelize.STRING,
	game_id: Sequelize.STRING
});

const Channels = sequelize.define('channels', {
	channel_id: Sequelize.INTEGER,

})

const Games = sequelize.define('games', {
	game_id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
    name: Sequelize.TEXT,
    setcount: Sequelize.INTEGER,
    enabled: Sequelize.DataTypes.BOOLEAN
});

const Bounties = sequelize.define('bounties', {
	game_id: Sequelize.STRING,
    position: Sequelize.STRING,
	position_value: Sequelize.INTEGER,
    points: Sequelize.INTEGER
});

const MatchOutcomes = sequelize.define('matchOutcomes', {
    id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
    game_id: Sequelize.STRING,
    winner_sets: Sequelize.INTEGER,
    loser_sets: Sequelize.INTEGER,
    winner_points: Sequelize.INTEGER,
    loser_points: Sequelize.INTEGER
},{
    timestamps: false,
});

// Matches.sync({ alter: true });
sequelize.sync()

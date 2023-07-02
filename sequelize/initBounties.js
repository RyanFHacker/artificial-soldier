const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Bounties = sequelize.define('bounties', {
	game_id: Sequelize.STRING,
    position: Sequelize.STRING,
    position_value: Sequelize.INTEGER,
    points: Sequelize.INTEGER
});

Bounties.create({
    game_id: "sf6",
    position: "1st",
    position_value: 1,
    points: 30
});

Bounties.create({
    game_id: "sf6",
    position: "2nd",
    position_value: 2,
    points: 25
});

Bounties.create({
    game_id: "sf6",
    position: "3rd",
    position_value: 3,
    points: 20
});

Bounties.create({
    game_id: "sf6",
    position: "4th",
    position_value: 4,
    points: 15
});

Bounties.create({
    game_id: "sf6",
    position: "5th",
    position_value: 5,
    points: 10
});

Bounties.create({
    game_id: "sf6",
    position: "6th",
    position_value: 6,
    points: 10
});

Bounties.create({
    game_id: "sf6",
    position: "7th",
    position_value: 7,
    points: 5
});

Bounties.create({
    game_id: "sf6",
    position: "8th",
    position_value: 8,
    points: 5
});

Bounties.create({
    game_id: "ggst",
    position: "1st",
    position_value: 1,
    points: 45
});

Bounties.create({
    game_id: "ggst",
    position: "2nd",
    position_value: 2,
    points: 40
});

Bounties.create({
    game_id: "ggst",
    position: "3rd",
    position_value: 3,
    points: 35
});

Bounties.create({
    game_id: "ggst",
    position: "4th",
    position_value: 4,
    points: 30
});

Bounties.create({
    game_id: "ggst",
    position: "5th",
    position_value: 5,
    points: 25
});

Bounties.create({
    game_id: "ggst",
    position: "6th",
    position_value: 6,
    points: 25
});

Bounties.create({
    game_id: "ggst",
    position: "7th",
    position_value: 7,
    points: 20
});

Bounties.create({
    game_id: "ggst",
    position: "8th",
    position_value: 8,
    points: 20
});
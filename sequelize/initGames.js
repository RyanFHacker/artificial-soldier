const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const GamesModel = require("../models/Games");

let games = [
    {
        "game_id": "sf6",
        "name": "Street Fighter 6",
        "setcount": 3,
        "enabled": true
    },
    {
        "game_id": "ggst",
        "name": "Guilty Gear: Strive",
        "setcount": 5,
        "enabled": true
    }
]

for (game of games) {
    GamesModel.create({
        game_id: game.game_id,
        name: game.name,
        setcount: game.setcount,
        enabled: game.enabled
    });
}

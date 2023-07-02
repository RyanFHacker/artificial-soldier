// add subjects with scores and rank
const Sequelize = require('sequelize');
const SubjectsModel = require("../models/Subjects");

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

let games = [
    {
        "game_id": "sf6"
    },
    {
        "game_id": "ggst"
    }
]

let topEight = [
    {
        "research_points": 1000,
        "nickname": "First",
        "rank": 1
    },
    {
        "research_points": 900,
        "nickname": "Second",
        "rank": 2
    },
    {
        "research_points": 800,
        "nickname": "Third",
        "rank": 3
    },
    {
        "research_points": 700,
        "nickname": "Fourth",
        "rank": 4
    },
    {
        "research_points": 600,
        "nickname": "Fifth",
        "rank": 5
    },
    {
        "research_points": 500,
        "nickname": "Sixth",
        "rank": 6
    },
    {
        "research_points": 400,
        "nickname": "Seventh",
        "rank": 7
    },
    {
        "research_points": 300,
        "nickname": "Eighth",
        "rank": 8
    }
]

// create top 8 for all games

// loop through games

for (game of games) {
    for (subject of topEight) {
        // add subjects
        SubjectsModel.create({
            research_points: subject.research_points,
            nickname: subject.nickname,
            rank: subject.rank,
            game_id: game.game_id });
    }
}

sequelize.sync()

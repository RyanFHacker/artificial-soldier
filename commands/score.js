const config = require("../config.json");


const { SlashCommandBuilder, Client, GatewayIntentBits } = require('discord.js');

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
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('Display scoreboard'),
	async execute(interaction) {
		// Get a list of all subjects by score
		const scores = await Subjects.findAll({attributes: ['subject_id', 'research_points']})
		let scoreBoard = ''
		var i = 0
		while (i < scores.length) {
			let userId = scores[i].subject_id
			let fetchUser = await interaction.client.users.fetch(userId)
			scoreBoard += `${fetchUser}${scores[i].research_points}\n`
			i++
		}
		await interaction.reply({content: scoreBoard, ephmeral: true});
	},
};
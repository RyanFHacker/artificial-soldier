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
	confirmed: Sequelize.DataTypes.BOOLEAN,
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('Display scoreboard'),
	async execute(interaction) {
		// Get a list of all subjects by score
		const scores = await Subjects.findAll({ 
			order: [
				['research_points', 'DESC']],
			attributes: [
				'subject_id', 'research_points', 'rank']})
		let scoreBoard = ''
		var i = 0
		while (i < scores.length) {
			let userId = scores[i].subject_id
			let fetchUser = await interaction.client.users.fetch(userId)
			let rank = scores[i].rank ? scores[i].rank : '   '
			scoreBoard += `${rank}   ${fetchUser.username} - ${scores[i].research_points}\n`
			i++
		}
		await interaction.reply({content: scoreBoard, ephmeral: true});
	},
};
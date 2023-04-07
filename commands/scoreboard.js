const config = require("../config.json");

const { SlashCommandBuilder } = require('discord.js');

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
	nickname: Sequelize.STRING
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scoreboard')
		.setDescription('Display scoreboard'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		// Get a list of all subjects by score
		const scores = await Subjects.findAll({ 
			order: [
				['research_points', 'DESC']],
			attributes: [
				'subject_id', 'research_points', 'rank', 'nickname']
		});
		
		let scoreboard = "```fix\nPOINTS  RANK  NAME\n"
		var i = 0
		while (i < scores.length) {
			let score = ("    " + scores[i].research_points).slice(-4)
			let rank = scores[i].rank ? ("     " + scores[i].rank) : '      ';
			let subject = ("    " + scores[i].nickname)
			scoreboard+= `${score}${rank}${subject}\n`
			i++
		}
		scoreboard += "```"

		await interaction.editReply({ content: scoreboard });
	},
};
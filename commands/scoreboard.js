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
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scoreboard')
		.setDescription('Display scoreboard'),
	async execute(interaction) {
		// Get a list of all subjects by score
		const scores = await Subjects.findAll({ 
			order: [
				['research_points', 'DESC']],
			attributes: [
				'subject_id', 'research_points', 'rank']
			})
		
		const guild = await interaction.client.guilds.fetch(config.guildId)
		let scoreboard = "```fix\nPOINTS  RANK  NAME\n"
		var i = 0
		while (i < scores.length) {
			let userId = scores[i].subject_id
			const member = await guild.members.fetch(userId);
			let score = ("    " + scores[i].research_points).slice(-4)
			let rank = scores[i].rank ? ("     " + scores[i].rank) : '    ';
			let subject = ("    " + member.nickname)
			scoreboard+= `${score}${rank}${subject}\n`
			i++
		}
		scoreboard += "```"

		await interaction.reply({ content: scoreboard, ephmeral: true});
	},
};
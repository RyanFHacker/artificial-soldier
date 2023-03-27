const config = require("../config.json");

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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
		let rankList = new String();
		let nameList = new String();
		let pointsList = new String();
		// Get a list of all subjects by score
		const scores = await Subjects.findAll({ 
			order: [
				['research_points', 'DESC']],
			attributes: [
				'subject_id', 'research_points', 'rank']})
		var i = 0
		const guild = await interaction.client.guilds.fetch(config.guildId)
		
		while (i < scores.length) {
			let userId = scores[i].subject_id
			const member = await guild.members.fetch(userId);
			let rank = scores[i].rank ? scores[i].rank : ' '
			rankList += `${rank}\n`
			nameList += `${member.nickname}\n`
			pointsList += `${scores[i].research_points}\n`
			i++
		}

		const scoreEmbed = new EmbedBuilder()
		.setColor(0x6a5b8a)
		.setTitle('Scores')
		.addFields({ name: 'Name', value: nameList, inline: true })
		.addFields({ name: 'Research Points', value: pointsList, inline: true })
		.addFields({ name: 'Rank', value: rankList, inline: true })

		await interaction.reply({ embeds: [scoreEmbed], ephmeral: true});
	},
};
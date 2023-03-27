const config = require("../config.json");
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// Setup the top 8

const {Sequelize, Op } = require('sequelize');

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
		.setName('rank')
		.setDescription('Reset the list of the top ranked players in the combat experiment.'),
	async execute(interaction) {
		let rankList = new String();
		let nameList = new String();
		let pointsList = new String();
		if (interaction.user.id == config.dadminId) {
			await Subjects.update({ rank: undefined }, {
				where: { subject_id: {[Op.not]: null }}
			})
			const getTopEight = await Subjects.findAll({ limit: 8, order: [
				['research_points', 'DESC'],
			] });
			let ranked = ''
			const guild = await interaction.client.guilds.fetch(config.guildId)
			var i = 0
			while (i < getTopEight.length) {
				let userId = getTopEight[i].subject_id
				let rank = i + 1
				await Subjects.update({ rank: rank }, {
					where: { subject_id: userId }
				});
				// let fetchUser = await interaction.client.users.fetch(userId)
				const member = await guild.members.fetch(userId);
				rankList += `${rank}\n`
				nameList += `${member.nickname}\n`
				pointsList += `${getTopEight[i].research_points}\n`
				// ranked += `${rank} - ${fetchUser.username} - ${getTopEight[i].research_points}\n`
				i++
			}
			const scoreEmbed = new EmbedBuilder()
				.setColor(0x6a5b8a)
				.setTitle('New Ranks')
				.addFields({ name: 'Rank', value: rankList, inline: true })
				.addFields({ name: 'Name', value: nameList, inline: true })
				.addFields({ name: 'Research Points', value: pointsList, inline: true })
				
			await interaction.reply({embeds: [scoreEmbed], ephmeral: true});
		}
	},
};
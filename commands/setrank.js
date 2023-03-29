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
		.setName('setrank')
		.setDescription('Reset the list of the top ranked players in the combat experiment.'),
	async execute(interaction) {;
		if (interaction.user.id == config.dadminId) {
			await Subjects.update({ rank: undefined }, {
				where: { subject_id: {[Op.not]: null }}
			})
			const getTopEight = await Subjects.findAll({ limit: 8, order: [
				['research_points', 'DESC'],
			] });

			const guild = await interaction.client.guilds.fetch(config.guildId)
			let scoreboard = "```fix\nRANK  POINTS  NAME\n"
			var i = 0
			while (i < getTopEight.length) {
				let userId = getTopEight[i].subject_id
				let rank = i + 1
				await Subjects.update({ rank: rank }, {
					where: { subject_id: userId }
				});
				const member = await guild.members.fetch(userId);
				let score = ("        " + getTopEight[i].research_points).slice(-8)
				let scoreboardRank = ("     " +  rank).slice(-2);
				let subject = ("    " + member.nickname)
				scoreboard+= `${scoreboardRank}${score}${subject}\n`
				i++
			}
			scoreboard += "```"

			await interaction.reply({content: scoreboard, ephmeral: true});
		}
	},
};
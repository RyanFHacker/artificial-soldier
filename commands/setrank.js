const config = require("../prodConfig.json");
const { SlashCommandBuilder } = require('discord.js');
// Setup the top 8
const { Op } = require('sequelize');

const SubjectsModel = require("../models/Subjects");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setrank')
		.setDescription('Reset the list of the top ranked players in the combat experiment.'),
	async execute(interaction) {
		await interaction.deferReply({content: "Loading...", ephemeral: true});
		if (interaction.user.id == config.dadminId) {
			const limit = 8
			
			await SubjectsModel.update({ rank: '' }, {
				where: { subject_id: {[Op.not]: null }}
			})

			const getTopEight = await SubjectsModel.findAll({ limit: 0 || limit,
				order: [
					['research_points', 'DESC']],
				attributes: [
					'subject_id', 'research_points', 'rank', 'nickname'] 
			});

			let scoreboard = "```fix\nRANK  POINTS  NAME\n"
			let i = 0
			while (i < getTopEight.length) {
				let userId = getTopEight[i].subject_id
				let rank = i + 1
				await SubjectsModel.update({ rank: rank }, {
					where: { subject_id: userId }
				});

				let score = ("        " + getTopEight[i].research_points).slice(-8)
				let scoreboardRank = ("     " +  rank).slice(-2);
				let subject = ("    " + getTopEight[i].nickname)
				scoreboard+= `${scoreboardRank}${score}${subject}\n`
				i++
			}
			scoreboard += "```"

			return await interaction.editReply({ content: scoreboard });
		}
	},
};
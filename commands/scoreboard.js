const { SlashCommandBuilder } = require('discord.js');

const SubjectsModel = require("../models/Subjects");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scoreboard')
		.setDescription('Display scoreboard'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		// Get a list of all subjects by score
		const scores = await SubjectsModel.findAll({ 
			order: [
				['research_points', 'DESC']],
			attributes: [
				'subject_id', 'research_points', 'rank', 'nickname']
		});
		
		let scoreboard = "```fix\nPOINTS  RANK  NAME\n"
		let i = 0
		while (i < scores.length) {
			let score = ("    " + scores[i].research_points).slice(-4)
			let rank = scores[i].rank ? ("     " + scores[i].rank) : '      ';
			let subject = ("    " + scores[i].nickname)
			scoreboard+= `${score}${rank}${subject}\n`
			i++
		}
		scoreboard += "```"

		return await interaction.editReply({ content: scoreboard });
	},
};
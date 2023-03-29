const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bountyinfo')
		.setDescription('Display a table outlining the points available when playing a player in the top eight.'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		let scoreboard = "```md\nRANK   POINTS\n1st    30 pts\n2nd    25 pts\n3rd    20 pts\n4th    15 pts\n5th    10 pts\n6th    10 pts\n7th     5 pts\n8th     5 pts\n```";
		await interaction.editReply({ content: scoreboard });
	},
};
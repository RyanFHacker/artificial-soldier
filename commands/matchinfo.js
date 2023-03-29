const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('matchinfo')
		.setDescription('Display a table outlining the points for the different outcomes of a match.'),
	async execute(interaction) {
		let scoreboard = "```md\nSCORE  WINNER  LOSER\n3-0    20 pts   5 pts\n3-1    20 pts  10 pts\n3-2    20 pts  15 pts\n```";
		await interaction.reply({content:scoreboard, ephmeral: true});
	},
};
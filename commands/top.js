const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top')
		.setDescription('Reads a list of the top ranked players in the combat experiment.'),
	async execute(interaction) {
		await interaction.reply({content:'Pong!', ephmeral: true});
	},
};
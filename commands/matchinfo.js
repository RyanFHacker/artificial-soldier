const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('matchinfo')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply({content:'Pong!', ephmeral: true});
	},
};
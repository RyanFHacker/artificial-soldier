const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		await interaction.editReply({ content: 'Pong!' });
		return;
	},
};

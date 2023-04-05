const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timetostart')
		.setDescription('Replies time until next Combat Research event.'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

        var now = new Date()

        var noonWed = new Date();
        noonWed.setDate(noonWed.getDate() + (3 + 7 - noonWed.getDay()) % 7);
        noonWed.setHours(12,0,0,0);
        var timeToStart = (((noonWed - now)/1000)/60)/60
        var timeToEnd = timeToStart + 12

        var start = `There are ${timeToStart.toFixed(2)} hours remaining until the beginning of the next event.\n`
        var end =  `There are ${timeToEnd.toFixed(2)} hours until the end of the current event`

		await interaction.editReply({ content: `${start + end}` });
		return;
	},
};
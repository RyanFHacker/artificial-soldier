const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timetostart')
		.setDescription('Replies time until next Combat Research event.'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

        const now = new Date()
        let noonWed = new Date();
        noonWed.setDate(noonWed.getDate() + (3 + 7 - noonWed.getDay()) % 7);
        noonWed.setHours(12,0,0,0);
        let timeToStart = noonWed - now

        const hoursDifference = Math.floor(timeToStart/1000/60/60);
        timeToStart -= hoursDifference*1000*60*60

        const minutesDifference = Math.floor(timeToStart/1000/60);
        timeToStart -= minutesDifference*1000*60

        const start = `There are ${hoursDifference} hrs ${minutesDifference} min remaining until Combat Research begins.\n`

		return await interaction.editReply({ content: `${start}` });
	},
};
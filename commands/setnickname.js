const { SlashCommandBuilder } = require('discord.js');

const SubjectsModel = require("../models/Subjects");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setnickname')
		.setDescription('Display scoreboard')
        .addStringOption(option =>
            option.setName('nickname')
                .setRequired(true)
                .setDescription('change nickname')),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		const subject_id = interaction.user.id
        const nickname = interaction.options.getString('nickname')
        await SubjectsModel.update({ nickname: nickname }, {
            where: { subject_id: subject_id }
        });

		return await interaction.editReply({ content: `Nickname updated to ${nickname}` });
	},
};
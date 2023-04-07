const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const SubjectsModel = require("../models/Subjects");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Add yourself to the Combat Research Institue roster.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel)
        .addStringOption(option =>
            option.setName('nickname')
                .setRequired(true)
                .setDescription('change nickname')),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const subject_id = interaction.user.id
        const nickname = interaction.options.getString('nickname')
        const getSubject = await Subjects.findOne({ where: { subject_id: subject_id} });
            if (!getSubject) {
                await SubjectsModel.create({
                    subject_id: subject_id,
                    research_points: 0,
                    confirmed: false,
                    nickname: nickname
                });
                await interaction.editReply({ content: `Registered ${interaction.user} as ${nickname}`, components: []});
            } else {
                await interaction.editReply({ content: `You appear to already be registered.`});
            }
	},
};
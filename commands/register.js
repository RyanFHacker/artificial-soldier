const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Subjects = sequelize.define('subjects', {
    subject_id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
    confirmed: Sequelize.DataTypes.BOOLEAN,
    nickname: Sequelize.STRING,
});

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
                await Subjects.create({
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
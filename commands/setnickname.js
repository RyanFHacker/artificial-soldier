const { SlashCommandBuilder } = require('discord.js');

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
	nickname: Sequelize.STRING
});

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
        await Subjects.update({ nickname: nickname }, {
            where: { subject_id: subject_id }
        });

		await interaction.editReply({ content: `Nickname updated to ${nickname}` });
	},
};
const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Subjects = sequelize.define('subjects', {
	subject_id: Sequelize.STRING,
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Add yourself to the Combat Research Institue roster.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel),
	async execute(interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('confirm')
                .setLabel('Confirm')
                .setStyle(ButtonStyle.Success),
        );
        //check if current user is in the subject list
        const getSubject = await Subjects.findOne({ where: { subject_id: interaction.user.id} });
            if (!getSubject) {
                await interaction.reply({ content: `Confirm you read the rules you liar.`, components: [row]});
                const filter = i => i.customId === 'confirm';
                const collector = interaction.channel.createMessageComponentCollector({filter});
                collector.on('collect', async i => {
                    const subject = await Subjects.create({
                        subject_id: interaction.user.id
                    });
                    await i.update({ content: `Registered ${interaction.user}`, components: [] });
                });
            } else {
                await interaction.reply({ content: `User is already registered!`});
            }
	},
};
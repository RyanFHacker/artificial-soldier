const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, moveElementInArray } = require('discord.js');
const { v4: uuidv4 } = require('uuid');

const Sequelize = require('sequelize');
const { DATE } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Matches = sequelize.define('matches', {
	match_id: Sequelize.STRING,
	results: Sequelize.TEXT,
	player0_id: Sequelize.DataTypes.STRING,
	player1_id: Sequelize.DataTypes.STRING,
	confirmed: Sequelize.DataTypes.BOOLEAN
});

const Subjects = sequelize.define('Subjects', {
	subject_id: Sequelize.STRING,
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
	

});

// Matches.sync();
// Subjects.sync();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('research')
		.setDescription('Enter your research match.')
        .addUserOption(option =>
			option
				.setName('opponent')
				.setDescription('Opponent during research match')
				.setRequired(true))
        .addStringOption(option =>
            option
                .setName('results')
                .setDescription('Results of the research match')
                .setRequired(true)
                .addChoices(
                    {name: '2-0', value: '2-0'},
                    {name: '2-1', value: '2-1'},
            )),
	async execute(interaction) {
		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('confirm')
				.setLabel('Confirm')
				.setStyle(ButtonStyle.Success),
		);

		// Don't allow a user to enter themselves
		if (interaction.user != interaction.options.getUser('opponent')) {
			const duplicateMatchToday = await Matches.findOne({ where: 
				{ player0_id: {[Sequelize.Op.or]: [interaction.user.id, interaction.options.getUser('opponent').id]}, player1_id: {[Sequelize.Op.or]: [interaction.user.id, interaction.options.getUser('opponent').id]}, createdAt: {[Sequelize.Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)}} });
			if (!duplicateMatchToday) {
				const match_id = uuidv4();
				const match = await Matches.create({
					match_id: match_id,
					results:interaction.options.getString('results'),
					player0_id: interaction.user.id,
					player1_id: interaction.options.getUser('opponent').id,
					confirmed: false
				});
	
				await interaction.reply({ content: `Match between ${interaction.user} and ${interaction.options.getUser('opponent')} added with the result of ${interaction.options.getString('results')}.`, components: [row]});
	
				const filter = i => i.customId === 'confirm' && i.user.id === interaction.options.getUser('opponent').id;
				const collector = interaction.channel.createMessageComponentCollector({filter});
		
				collector.on('collect', async i => {
					// update match as confirmed
					const getMatch = await Matches.findOne({ where: { match_id: match_id} });
					if (getMatch) {
						getMatch.update({confirmed: true})
						await i.update({ content: `Confirmed ${match}`, components: [] });
					}
				});
			} else {
				await interaction.reply({content: `This appears to be a duplicate match`})
			}
			}else {
				await interaction.reply({content: `You can't claim a match against yourself`})
			}
	}
};
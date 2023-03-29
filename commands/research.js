const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
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
	match_id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	results: Sequelize.TEXT,
	player0_id: Sequelize.DataTypes.STRING,
	player1_id: Sequelize.DataTypes.STRING,
	confirmed: Sequelize.DataTypes.BOOLEAN
});

const Subjects = sequelize.define('subjects', {
	subject_id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
	confirmed: Sequelize.DataTypes.BOOLEAN,

});

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
                    {name: '3-0', value: '3-0'},
                    {name: '3-1', value: '3-1'},
					{name: '3-2', value: '3-2'},
            ))
		.setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel),
	async execute(interaction) {
		await interaction.deferReply();
		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('confirm')
				.setLabel('Confirm')
				.setStyle(ButtonStyle.Success),
		);
		const player0_id = interaction.user.id
		const player1_id = interaction.options.getUser('opponent').id
		const getWinningSubject = await Subjects.findOne({ where: { subject_id: player0_id} })
		const getLosingSubject = await Subjects.findOne({ where: { subject_id: player1_id} })
		// Verify both subjects are registered
		if (getWinningSubject && getLosingSubject) {
			// Don't allow a user to enter themselves
			if (interaction.user != interaction.options.getUser('opponent')) {
				const duplicateMatchToday = await Matches.findOne({ where: 
					{ player0_id: {[Sequelize.Op.or]: [player0_id, player1_id]}, player1_id: {[Sequelize.Op.or]: [player0_id, player1_id]}, createdAt: {[Sequelize.Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)}} });
				if (!duplicateMatchToday) {
					// only from 12 PM to 12 AM Wednesday
					var noon = new Date()
					var midnight = new Date();
					var now = new Date()

					noon.setHours(12,0,0,0);
					midnight.setDate((midnight.getDate() + 1))
					midnight.setHours(23,59,59,99)
					if (now.getDay() === 3 && now >= noon && now <= midnight) {
						// check bounty, so if player 1 has a rank, give extra
						let bounty = 0
						if (getWinningSubject.rank > getLosingSubject.rank) {
							switch (getLosingSubject.rank) {
								case 1:
									bounty = 30
									break;
								case 2:
									bounty = 25
									break;
								case 3:
									bounty = 20
									break;
								case 4:
									bounty = 15
									break;
								case 5:
									bounty = 10
									break;
								case 6:
									bounty = 10
									break;
								case 7:
									bounty = 5
									break;
								case 8:
									bounty = 5
									break;
								case null:
									break;
							}
						}

						const match_id = uuidv4();
						Matches.create({
							match_id: match_id,
							results:interaction.options.getString('results'),
							player0_id: player0_id,
							player1_id: player1_id,
							confirmed: false
						});
			
						await interaction.editReply({ content: `Match between ${interaction.user} and ${interaction.options.getUser('opponent')} added with the result of ${interaction.options.getString('results')}.`, components: [row]});
			
						const filter = i => i.customId === 'confirm' && i.user.id === interaction.options.getUser('opponent').id;
						const collector = interaction.channel.createMessageComponentCollector({filter});
				
						collector.on('collect', async i => {
							// update match as confirmed
							const getMatch = await Matches.findOne({ where: { match_id: match_id} });
							if (getMatch) {
								getMatch.update({confirmed: true})
								switch (getMatch.results) {
									case '3-0':
										getWinningSubject.update({research_points: (getWinningSubject.research_points + bounty + 20)})
										getLosingSubject.update({research_points: (getLosingSubject.research_points + 5)})
										break;
									case '3-1':
										getWinningSubject.update({research_points: (getWinningSubject.research_points + bounty + 20)})
										getLosingSubject.update({research_points: (getLosingSubject.research_points + 10)})
										break;
									case '3-2':
										getWinningSubject.update({research_points: (getWinningSubject.research_points + bounty + 20)})
										getLosingSubject.update({research_points: (getLosingSubject.research_points + 15)})
										break;
								}
								await i.update({ content: `Confirmed ${interaction.user} ${getMatch.results} ${ interaction.options.getUser('opponent')}`, components: []});
							}
						});
					} else {
						await interaction.editReply({content: `You have attempted to submit a match outside of the desginated day or hours!`})
					}
				} else {
					await interaction.editReply({content: `This appears to be a duplicate match`})
				}
				} else {
					await interaction.editReply({content: `You can't claim a match against yourself`})
				}
		} else if (!getWinningSubject) {
			await interaction.editReply({content: `You are not registered, please do so with the /register command`})
		} else if (!getLosingSubject) {
			await interaction.editReply({content: `Your opponent is not registered, please have them do so with the /register command` })
		}
	}
};
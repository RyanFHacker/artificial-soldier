const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { v4: uuidv4 } = require('uuid');
const config = require("../config.json");

const Sequelize = require('sequelize');

const MatchesModel = require("../models/Matches");
const SubjectsModel = require("../models/Subjects");

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
		await interaction.deferReply({content: "Loading!"});
		try {
			const player0 = interaction.user
			const player1 = interaction.options.getUser('opponent')
			const getWinningSubject = await SubjectsModel.findOne({ where: { subject_id: player0.id} })
			const getLosingSubject = await SubjectsModel.findOne({ where: { subject_id: player1.id} })
			const match_id = uuidv4();
			const deny_id = uuidv4();

			let match

			const filter = i => i.user.id === player1.id;
			const collector = interaction.channel.createMessageComponentCollector({filter});

			collector.on('collect', async i => {
				if (i.customId === match_id) {
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
				// update match as confirmed
				if (match) {
					match.update({confirmed: true})
					switch (match.results) {
						case '3-0':
							await SubjectsModel.increment({research_points: (+20+bounty)}, { where: { subject_id:getWinningSubject.subject_id }});
							await SubjectsModel.increment({research_points: (+5+bounty)}, { where: { subject_id:getLosingSubject.subject_id }});
							break;
						case '3-1':
							await SubjectsModel.increment({research_points: (+20+bounty)}, { where: { subject_id:getWinningSubject.subject_id }});
							await SubjectsModel.increment({research_points: (+10+bounty)}, { where: { subject_id:getLosingSubject.subject_id }});
							break;
						case '3-2':
							await SubjectsModel.increment({research_points: (+20+bounty)}, { where: { subject_id:getWinningSubject.subject_id }});
							await SubjectsModel.increment({research_points: (+15+bounty)}, { where: { subject_id:getLosingSubject.subject_id }});
							break;
					}
					return await i.update({ content: `Confirmed ${match.player0_nickname} ${match.results} ${match.player1_nickname}`, components: [] })
				}
				} else if (i.customId === deny_id ) {
					//remove the match
					MatchesModel.destroy({ where: { match_id: match_id}})
					return await i.update({ content: `Denied ${match.player0_nickname} ${match.results} ${match.player1_nickname}`, components: [] })
				}

			});

			// Verify both subjects are registered
			if (getWinningSubject && getLosingSubject) {
				// Don't allow a user to enter themselves
				if ((interaction.user != interaction.options.getUser('opponent') || config.selfPlay)) {
					const duplicateMatchToday = await MatchesModel.findOne({ where: 
						{ player0_id: {[Sequelize.Op.or]: [player0.id, player1.id]}, player1_id: {[Sequelize.Op.or]: [player0.id, player1.id]}, createdAt: {[Sequelize.Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)}} });
					if (!duplicateMatchToday || config.duplicates) {
						// only from 12 PM to 12 AM Wednesday
						var noon = new Date()
						var midnight = new Date();
						var now = new Date()
	
						noon.setHours(12,0,0,0);
						midnight.setDate((midnight.getDate() + 1))
						midnight.setHours(23,59,59,99)
						if ((now.getDay() === 3 && now >= noon && now <= midnight) || config.wednesday) {
						
							// create match
							match = await MatchesModel.create({
								match_id: match_id,
								results:interaction.options.getString('results'),
								player0_id: player0.id,
								player0_nickname: getWinningSubject.nickname,
								player1_id: player1.id,
								player1_nickname: getLosingSubject.nickname,
								confirmed: false
							});

							const row = new ActionRowBuilder()
								.addComponents(
									new ButtonBuilder()
										.setCustomId(match_id)
										.setLabel('Confirm')
										.setStyle(ButtonStyle.Success),
								)
								.addComponents(
									new ButtonBuilder()
										.setCustomId(deny_id)
										.setLabel('Deny')
										.setStyle(ButtonStyle.Secondary),
								)

							return await interaction.editReply({ content: `Match between ${match.player0_nickname} and ${match.player1_nickname} added with the result of ${match.results}.`, components: [row]});
						} else {
							return await interaction.editReply({ content: `You have attempted to submit a match outside of the desginated day or hours!` })
						}
					} else {
						return await interaction.editReply({ content: `This appears to be a duplicate match` })
					}
					} else {
						return await interaction.editReply({ content: `You can't claim a match against yourself`})
					}
			} else if (!getWinningSubject) {
				return await interaction.editReply({ content: `You are not registered, please do so with the /register command` })
			} else if (!getLosingSubject) {
				return await interaction.editReply({ content: 'Your opponent is not registered, please have them do so with the /register command'});
			}

			// return await interaction.editReply({ content: `${contentMessage}`, components: [componentMessage]});
		} catch (error) {
			console.error(error);
			return await interaction.editReply({ content: 'There was an error while executing this command! research'});
		}
	}
};

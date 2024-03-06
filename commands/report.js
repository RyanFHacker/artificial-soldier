const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const config = require("../prodConfig.json");
const { getGameOptions, confirmMatch } = require("../config/common-options.js");
const Sequelize = require("sequelize");
const MatchesModel = require("../models/Matches.js");
const SubjectsModel = require("../models/Subjects.js");
const BountiesModel = require("../models/Bounties.js");
const MatchOutcomesModel = require("../models/MatchOutcomes.js");
const GamesModel = require("../models/Games.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Report the score")
    .addStringOption(getGameOptions())
    .addUserOption((option) =>
      option
        .setName("opponent")
        .setDescription("Opponent during research match")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("loser_sets")
        .setDescription("Sets won by loser")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ content: "Loading!" });
    try {
      if (interaction.channelId == config.reportChannel) {
        const winner = interaction.user;
        const loser = interaction.options.getUser("opponent");
        const game_id = interaction.options.getString("game");
        const game = await GamesModel.findOne({ where: { game_id: game_id } });
        const loser_sets = interaction.options.getInteger("loser_sets");
        let response = ``;
        let components = [];

        if (loser_sets <= game.setcount - 1) {
          const winningSubject = await SubjectsModel.findOne({
            where: { subject_id: winner.id, game_id: game_id },
          });
          const losingSubject = await SubjectsModel.findOne({
            where: { subject_id: loser.id, game_id },
          });
          const match_id = uuidv4();
          const deny_id = uuidv4();

          const filter = (i) => i.user.id === loser.id || config.test === true;
          const collector = interaction.channel.createMessageComponentCollector(
            {
              filter,
            }
          );

          collector.on("collect", async (i) => {
            if (i.customId === match_id) {
              // update match as confirmed
              const match = await MatchesModel.findOne({
                where: {
                  match_id: match_id,
                },
              });
              if (match) {
                confirmMatch(i.customId);
                return await i.update({
                  content: `Confirmed ${match.winner_nickname} ${match.results} ${match.loser_nickname}`,
                  components: [],
                });
              }
            } else if (i.customId === deny_id) {
              //remove the match
              MatchesModel.destroy({ where: { deny_id: deny_id } });
              return await i.update({
                content: `Denied ${match.winner_nickname} ${match.results} ${match.loser_nickname}`,
                components: [],
              });
            }
          });

          // Verify both subjects are registered
          if (winningSubject && losingSubject) {
            // Don't allow a user to enter themselves
            if (
              interaction.user != interaction.options.getUser("opponent") ||
              config.selfPlay
            ) {
              const duplicateMatchToday = await MatchesModel.findOne({
                where: {
                  winner_id: { [Sequelize.Op.or]: [winner.id, loser.id] },
                  loser_id: { [Sequelize.Op.or]: [winner.id, loser.id] },
                  game_id: game_id,
                  createdAt: {
                    [Sequelize.Op.gt]: new Date(
                      new Date() - 24 * 60 * 60 * 1000
                    ),
                  },
                },
              });
              if (!duplicateMatchToday || config.duplicates) {
                // only from 12 PM to 12 AM Wednesday
                const now = new Date();
                let noon = new Date();
                let midnight = new Date();

                noon.setHours(12, 0, 0, 0);
                midnight.setDate(midnight.getDate() + 1);
                midnight.setHours(23, 59, 59, 99);
                if (
                  (now.getDay() === 3 && now >= noon && now <= midnight) ||
                  config.wednesday
                ) {
                  let match_outcome = await MatchOutcomesModel.findOne({
                    where: { game_id: game_id, loser_sets: loser_sets },
                  });
                  // check bounty, so if loser has a rank, give extra
                  // get bounties based on game based on losing players rank
                  // if loser has a rank and the winner has
                  let bounty_points = 0;
                  if (
                    (losingSubject.rank &&
                      winningSubject.rank > losingSubject.rank) ||
                    winningSubject.rank == null
                  ) {
                    bounty = await BountiesModel.findOne({
                      where: {
                        position_value: losingSubject.rank,
                        game_id: game.game_id,
                      },
                    });
                    bounty_points += bounty.points;
                    //if champion bounty
                  } else if (losingSubject.champion === true) {
                    bounty_points += game.championBounty;
                  }
                  // create match
                  match = await MatchesModel.create({
                    match_id: match_id,
                    deny_id: deny_id,
                    results: `${match_outcome.winner_sets}-${match_outcome.loser_sets}`,
                    winner_id: winner.id,
                    winner_nickname: winningSubject.nickname,
                    winner_points: match_outcome.winner_points,
                    loser_id: loser.id,
                    loser_nickname: losingSubject.nickname,
                    loser_points: match_outcome.loser_points,
                    confirmed: false,
                    game_id: game.game_id,
                    bounty_points: bounty_points,
                  });

                  const row = new ActionRowBuilder()
                    .addComponents(
                      new ButtonBuilder()
                        .setCustomId(match_id)
                        .setLabel(`Confirm`)
                        .setStyle(ButtonStyle.Success)
                    )
                    .addComponents(
                      new ButtonBuilder()
                        .setCustomId(deny_id)
                        .setLabel(`Deny`)
                        .setStyle(ButtonStyle.Secondary)
                    );
                  response = `Match between ${match.winner_nickname} and ${match.loser_nickname} added with the result of ${game.setcount} - ${loser_sets}.`;
                  components = [row];
                } else {
                  response = `You have attempted to submit a match outside of the desginated day or hours!`;
                }
              } else {
                response = `This appears to be a duplicate match`;
              }
            } else {
              response = `You can't claim a match against yourself`;
            }
          } else if (!winningSubject) {
            response = `You are not registered for this game, please do so with the /register command`;
          } else if (!losingSubject) {
            response = `Your opponent is not registered for this game, please have them do so with the /register command`;
          }
        } else {
          response = `Loser set count surpasses what is possible in a First to ${game.setcount} set`;
        }
        return await interaction.editReply({
          content: response,
          components: components,
        });
      }
    } catch (error) {
      console.error(error);
      return await interaction.editReply({
        content: "There was an error while executing this command! research",
      });
    }
  },
};

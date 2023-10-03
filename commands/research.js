const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const config = require("../prodConfig.json");

const Sequelize = require("sequelize");

const MatchesModel = require("../models/Matches");
const SubjectsModel = require("../models/Subjects");
const BountiesModel = require("../models/Bounties");
const MatchOutcomesModel = require("../models/MatchOutcomes");
const GamesModel = require("../models/Games");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("research")
    .setDescription("Enter your research match.")
    .addStringOption((option) =>
      option
        .setName("game")
        .setDescription("Select the game that was played")
        .setRequired(true)
        .addChoices(
          { name: "SF6", value: "sf6" },
          { name: "GGST", value: "ggst" },
          { name: "XRD", value: "xrd" }
        )
    )
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
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel),
  async execute(interaction) {
    await interaction.deferReply({ content: "Loading!" });
    try {
      const winner = interaction.user;
      const loser = interaction.options.getUser("opponent");
      const game_id = interaction.options.getString("game");
      const game = await GamesModel.findOne({ where: { game_id: game_id } });
      const getWinningSubject = await SubjectsModel.findOne({
        where: { subject_id: winner.id, game_id: game_id },
      });
      const getLosingSubject = await SubjectsModel.findOne({
        where: { subject_id: loser.id, game_id },
      });
      const loser_sets = interaction.options.getInteger("loser_sets");

      if (loser_sets <= game.setcount - 1) {
        const match_id = uuidv4();
        const deny_id = uuidv4();

        const filter = (i) => i.user.id === loser.id;
        const collector = interaction.channel.createMessageComponentCollector({
          filter,
        });

        collector.on("collect", async (i) => {
          if (i.customId === match_id) {
            // check bounty, so if player 1 has a rank, give extra
            // get bounties based on game based on losing players rank
            let bounty = 0;
            if (getWinningSubject.rank < getLosingSubject.rank) {
              bounty = await BountiesModel.findOne({
                where: {
                  position_value: getLosingSubject.rank,
                  game_id: game.game_id,
                },
              });
            }
            // update match as confirmed
            if (match) {
              let match_outcome = await MatchOutcomesModel.findOne({
                where: { game_id: game_id, loser_sets: loser_sets },
              });
              match.update({
                results: `${game.setcount} - ${loser_sets}`,
                confirmed: true,
                winner_points: match_outcome.winner_points,
                loser_points: match_outcome.loser_points,
                bounty_points: bounty,
              });
              await SubjectsModel.increment(
                { research_points: +match_outcome.winner_points + bounty },
                {
                  where: {
                    subject_id: getWinningSubject.subject_id,
                    game_id: game_id,
                  },
                }
              );
              await SubjectsModel.increment(
                { research_points: +match_outcome.loser_points },
                {
                  where: {
                    subject_id: getLosingSubject.subject_id,
                    game_id: game_id,
                  },
                }
              );

              return await i.update({
                content: `Confirmed ${match.winner_nickname} ${match.results} ${match.loser_nickname}`,
                components: [],
              });
            }
          } else if (i.customId === deny_id) {
            //remove the match
            MatchesModel.destroy({ where: { match_id: match_id } });
            return await i.update({
              content: `Denied ${match.winner_nickname} ${match.results} ${match.loser_nickname}`,
              components: [],
            });
          }
        });

        // Verify both subjects are registered
        if (getWinningSubject && getLosingSubject) {
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
                  [Sequelize.Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
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
                // create match
                match = await MatchesModel.create({
                  match_id: match_id,
                  results: interaction.options.getString("results"),
                  winner_id: winner.id,
                  winner_nickname: getWinningSubject.nickname,
                  loser_id: loser.id,
                  loser_nickname: getLosingSubject.nickname,
                  confirmed: false,
                  game_id: game.game_id,
                });

                const row = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId(match_id)
                      .setLabel("Confirm")
                      .setStyle(ButtonStyle.Success)
                  )
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId(deny_id)
                      .setLabel("Deny")
                      .setStyle(ButtonStyle.Secondary)
                  );

                return await interaction.editReply({
                  content: `Match between ${match.winner_nickname} and ${match.loser_nickname} added with the result of ${game.setcount} - ${loser_sets}.`,
                  components: [row],
                });
              } else {
                return await interaction.editReply({
                  content: `You have attempted to submit a match outside of the desginated day or hours!`,
                });
              }
            } else {
              return await interaction.editReply({
                content: `This appears to be a duplicate match`,
              });
            }
          } else {
            return await interaction.editReply({
              content: `You can't claim a match against yourself`,
            });
          }
        } else if (!getWinningSubject) {
          return await interaction.editReply({
            content: `You are not registered for this game, please do so with the /register command`,
          });
        } else if (!getLosingSubject) {
          return await interaction.editReply({
            content:
              "Your opponent is not registered for this game, please have them do so with the /register command",
          });
        }
      } else {
        return await interaction.editReply({
          content: `Loser set count surpasses what is possible in a First to ${game.setcount} set`,
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

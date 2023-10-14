const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const config = require("../prodConfig.json");
const { getGameOptions } = require("../config/common-options.js");
const MatchesModel = require("../models/Matches");
const SubjectsModel = require("../models/Subjects");
const GamesModel = require("../models/Games");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss-of-judas")
    .setDescription("Our lord doth press lips upon thee!")
    .addStringOption(getGameOptions())
    .addUserOption((option) =>
      option
        .setName("besmooched")
        .setDescription("Whom'st've upon bequethed a smooch from Thee, m'lord?")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    try {
      if (interaction.user.id == config.judasId) {
        const besmooched = interaction.options.getUser("besmooched");
        const game_id = interaction.options.getString("game");
        const game = await GamesModel.findOne({ where: { game_id: game_id } });
        const getBesmoochedSubject = await SubjectsModel.findOne({
          where: { subject_id: besmooched.id, game_id: game_id },
        });

        if (!getBesmoochedSubject) {
          return await interaction.editReply({
            content: `My lord, this user is not registered for this game!`,
          });
        } else {
          const match_id = uuidv4();
          match = await MatchesModel.create({
            match_id: match_id,
            results: "Kisses",
            winner_id: besmooched.id,
            winner_nickname: getBesmoochedSubject.nickname,
            winner_points: 5,
            confirmed: true,
            game_id: game.game_id,
          });

          await SubjectsModel.increment(
            { research_points: +5 },
            {
              where: {
                subject_id: getBesmoochedSubject.subject_id,
                game_id: game_id,
              },
            }
          );
          return await interaction.editReply({
            content: `I compare you to a kiss from a Bison main. \n${getBesmoochedSubject.nickname} in ${game.game_id}`,
          });
        }
      } else {
        return await interaction.editReply({
          content: `You aren't Judas!`,
        });
      }
    } catch {
      console.error(error);
      return await interaction.editReply({
        content: "There was an error while executing this command! kiss-of-judas",
      });
    }
  },
};

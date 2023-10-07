const config = require("../prodConfig.json");
const { SlashCommandBuilder } = require("discord.js");
const { getGameOptions } = require("../config/common-options.js");
const GamesModel = require("../models/Games");
const SubjectsModel = require("../models/Subjects");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-champion")
    .setDescription(
      "Set a player as a champion for a game, increasing the bounty on that player."
    )
    .addStringOption(getGameOptions())
    .addUserOption((option) =>
      option
        .setName("champion")
        .setDescription("Player to be set as a champion")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    try {
      const champion = interaction.options.getUser("champion");
      const game_id = interaction.options.getString("game");
      if (interaction.user.id == config.projectId) {
        const game = await GamesModel.findOne({ where: { game_id: game_id } });
        const getChampionSubject = await SubjectsModel.findOne({
          where: { subject_id: champion.id, game_id: game_id },
        });

        getChampionSubject.update({
          champion: true,
        });

        return await interaction.editReply({
          content: `${getChampionSubject.nickname} is set as a champion for ${game.game_id}`,
        });
      } else {
        return await interaction.editReply({
          content: `You aren't Project!`,
        });
      }
    } catch (error) {
      console.error(error);
      return await interaction.editReply({
        content:
          "There was an error while executing this command! set-champion",
      });
    }
  },
};

const { SlashCommandBuilder } = require("discord.js");
const { getGameOptions } = require("../config/common-options.js");
const SubjectsModel = require("../models/Subjects");
const GamesModel = require("../models/Games");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-nickname")
    .setDescription("Display scoreboard")
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setRequired(true)
        .setDescription("change nickname")
    )
    .addStringOption(getGameOptions()),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const subject_id = interaction.user.id;
    const game_id = interaction.options.getString("game");
    const nickname = interaction.options.getString("nickname");
    const getSubject = await SubjectsModel.findOne({
      where: { subject_id: subject_id, game_id: game_id },
    });
    let game = await GamesModel.findOne({ where: { game_id: game_id } });
    if (getSubject) {
      await SubjectsModel.update(
        { nickname: nickname },
        {
          where: { subject_id: subject_id, game_id: game_id },
        }
      );
    } else {
      return await interaction.editReply({
        content: `You are not registered for this ${game.name}, please do so with the /register command`,
      });
    }
    return await interaction.editReply({
      content: `Nickname updated to ${nickname} for ${game.name}`,
    });
  },
};

const { SlashCommandBuilder } = require("discord.js");

const SubjectsModel = require("../models/Subjects");
const GamesModel = require("../models/Games");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setnickname")
    .setDescription("Display scoreboard")
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setRequired(true)
        .setDescription("change nickname")
    )
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
    ),
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

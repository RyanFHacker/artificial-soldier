const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getGameOptions } = require("../config/common-options.js");
const SubjectsModel = require("../models/Subjects");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Add yourself to the Combat Research Institue roster.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel)
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("Nickname for this game")
        .setRequired(true)
    )
    .addStringOption(getGameOptions()),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    try {
      const subject_id = interaction.user.id;
      const nickname = interaction.options.getString("nickname");
      const game_id = interaction.options.getString("game");
      const getSubject = await SubjectsModel.findOne({
        where: { subject_id: subject_id, game_id: game_id },
      });
      if (!getSubject) {
        await SubjectsModel.create({
          subject_id: subject_id,
          research_points: 0,
          nickname: nickname,
          game_id: game_id,
          rank: "",
        });
        return await interaction.editReply({
          content: `Registered ${interaction.user} as ${nickname} for ${game_id}`,
          components: [],
        });
      } else {
        return await interaction.editReply({
          content: `You appear to already be registered.`,
        });
      }
    } catch (error) {
      console.error(error);
      return await interaction.editReply({
        content: "There was an error while executing this command! register",
      });
    }
  },
};

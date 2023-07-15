const config = require("../prodConfig.json");
const { SlashCommandBuilder } = require("discord.js");
// Setup the top 8
const { Op } = require("sequelize");

const SubjectsModel = require("../models/Subjects");
const GamesModel = require("../models/Games");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setrank")
    .setDescription(
      "Reset the list of the top ranked players in the combat experiment."
    ),
  async execute(interaction) {
    await interaction.deferReply({ content: "Loading...", ephemeral: true });
    const games = await GamesModel.findAll();
    if (interaction.user.id == config.dadminId) {
      const limit = 8;
      games.forEach(async (game) => {
        await SubjectsModel.update(
          { rank: "" },
          {
            where: { subject_id: { [Op.not]: null } },
          }
        );

        const getTopEight = await SubjectsModel.findAll({
          limit: 0 || limit,
          order: [["research_points", "DESC"]],
          attributes: ["subject_id", "research_points", "rank", "nickname"],
          where: { game_id: game.game_id },
        });
        let i = 0;
        while (i < getTopEight.length) {
          let userId = getTopEight[i].subject_id;
          let rank = i + 1;
          SubjectsModel.update(
            { rank: rank },
            {
              where: { subject_id: userId, game_id: game.game_id },
            }
          );
          i++;
        }
      });
      return await interaction.editReply({ content: `Ranks set` });
    }
  },
};

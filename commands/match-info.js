const { SlashCommandBuilder } = require("discord.js");
const { getGameOptions } = require("../config/common-options.js");
const MatchOutcomesModel = require("../models/MatchOutcomes");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("match-info")
    .setDescription(
      "Display a table outlining the points for the different outcomes of a match."
    )
    .addStringOption(getGameOptions()),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const game_id = interaction.options.getString("game");
    let matchOutcomes = await MatchOutcomesModel.findAll({
      order: [["loser_sets", "DESC"]],
      where: {
        game_id: game_id,
      },
    });

    let scoreboard = "```md\nSCORE  WINNER  LOSER\n```";
    let scores = "";

    matchOutcomes.forEach((element) => {
      scores += `${element.winner_sets} - ${element.loser_sets}  ${element.winner_points} pts  ${element.loser_points} pts\n`;
    });
    scoreboard = [
      scoreboard.slice(0, scoreboard.length - 3),
      scores,
      scoreboard.slice(scoreboard.length - 3, scoreboard.length),
    ].join("");

    return await interaction.editReply({ content: scoreboard });
  },
};

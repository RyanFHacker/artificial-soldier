const { SlashCommandBuilder } = require("discord.js");

const MatchOutcomesModel = require("../models/MatchOutcomes");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("matchinfo")
    .setDescription(
      "Display a table outlining the points for the different outcomes of a match."
    )
    .addStringOption((option) =>
      option
        .setName("game")
        .setRequired(true)
        .setDescription("Select the game in which you would like to register")
        .addChoices(
          { name: "SF6", value: "sf6" },
          { name: "GGST", value: "ggst" }
        )
    ),
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

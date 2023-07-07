const { SlashCommandBuilder } = require("discord.js");

const BountiesModel = require("../models/Bounties");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bountyinfo")
    .setDescription(
      "Display a table outlining the points available when playing a player in the top eight."
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
    let bounties = await BountiesModel.findAll({
      order: [["position_value", "ASC"]],
      where: {
        game_id: game_id,
      },
    });

    let scoreboard = "```md\nRANK   POINTS\n```";
    let scores = "";

    bounties.forEach((element) => {
      scores += `${element.position}   ${element.points} pts\n`;
    });
    scoreboard = [
      scoreboard.slice(0, scoreboard.length - 3),
      scores,
      scoreboard.slice(scoreboard.length - 3, scoreboard.length),
    ].join("");
    return await interaction.editReply({ content: scoreboard });
  },
};

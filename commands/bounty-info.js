const { SlashCommandBuilder } = require("discord.js");
const { getGameOptions } = require("../config/common-options.js");
const BountiesModel = require("../models/Bounties");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bounty-info")
    .setDescription(
      "Display a table outlining the points available when playing a player in the top eight."
    )
    .addStringOption(getGameOptions()),
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
      scores += `${element.position_value}      ${element.points} pts\n`;
    });
    scoreboard = [
      scoreboard.slice(0, scoreboard.length - 3),
      scores,
      scoreboard.slice(scoreboard.length - 3, scoreboard.length),
    ].join("");
    return await interaction.editReply({ content: scoreboard });
  },
};

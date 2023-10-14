const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const GamesModel = require("../models/Games");

// Will need to fulfill the requirements of a game for the table
// As well as what is necessary for all game based commands
module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-game")
    .setDescription("Add a new game to the challenge.")
    .addStringOption((option) =>
      option
        .setName("game_id")
        .setDescription("Game_id is just a shorthand string of the game name")
    )
    .addStringOption((option) =>
      option.setName("name").setDescription("Name is the game's full name")
    )
    .addIntegerOption((option) =>
      option.setName("max_bounty").setDescription("Sets won by loser")
    )
    .addIntegerOption((option) =>
      option
        .setName("champion_bounty")
        .setDescription(
          "Extra points if a player defeats another designated as a 'Champion'"
        )
    )
    .addBooleanOption((option) =>
      option
        .setName("enabled")
        .setDescription("Whether or not the game is enabled")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    return await interaction.editReply({ content: "Command not yet operating." });
  },
};

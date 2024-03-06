const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup your competition"),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    // Create config file
    // Set registration channel id
    // Set reporting channel id
    // Set rankings channel id
    return await interaction.editReply({ content: "Setup!" });
  },
};
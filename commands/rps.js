const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const { v4: uuidv4 } = require("uuid");
const config = require("../prodConfig.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Start a Rock, Paper, Scissors match")
    .addStringOption((option) =>
      option
        .setName("select")
        .setDescription("Select the game that was played")
        .setRequired(true)
        .addChoices(
          { name: "Rock", value: "rock" },
          { name: "Paper", value: "paper" },
          { name: "Scissors", value: "scissors" }
        )
    )
    .addUserOption((option) =>
      option
        .setName("opponent")
        .setDescription("Opponent during research match")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    try {
      const player1 = interaction.user;
      const player2 = interaction.options.getUser("opponent");
      const player1Choice = interaction.options.getString("select");
      let player2Choice = "";
      let player1Win = null;
      const match_id = uuidv4();

      const filter = (i) => i.user.id === player2.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
      });

      collector.on("collect", async (i) => {
          switch (player1Choice) {
            case "rock":
              if (i.customId === (match_id, "paper")) {
                player1Win = false;
                player2Choice = "paper"
              } else if (i.customId === (match_id, "scissors")) {
                player1Win = true;
                player2Choice = "scissors"
              }
              break;
            case "paper":
              if (i.customId === (match_id, "scissors")) {
                player1Win = false;
                player2Choice = "scissors"
              } else if (i.customId === (match_id, "rock")) {
                player1Win = true;
                player2Choice = "rock"
              }
              break;
            case "scissors":
              if (i.customId === (match_id, "paper")) {
                player1Win = true;
                player2Choice = "paper"
              } else if (i.customId === (match_id, "rock")) {
                player1Win = false;
                player2Choice = "rock"
              }
              break;
          }
          if (player1Win === true) {
            return await i.update({
              content: `${player1} (${player1Choice}) Wins VS. ${player2} (${player2Choice})`,
              components: [],
            });
          } else if (player1Win === false) {
            return await i.update({
              content: `${player2} (${player2Choice}) Wins VS. ${player1} (${player1Choice})`,
              components: [],
            });
          } else {
            return await i.update({
              content: `Draw between ${player1} (${player1Choice}) and ${player2} (${player1Choice})`,
              components: [],
            });
          }
      });
      if (
        // interaction.user != interaction.options.getUser("opponent") ||
        config.selfPlay || true
      ) {
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId((match_id + "rock"))
              .setLabel("Rock")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId((match_id + "scissors"))
              .setLabel("Paper")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId((match_id + "paper"))
              .setLabel("Scissors")
              .setStyle(ButtonStyle.Success)
          );

        return await interaction.editReply({
          content: `RPS match between ${player1} and ${player2}, what do you choose?`,
          components: [row],
        });
      }
    } catch (error) {
      console.error(error);
      return await interaction.editReply({
        content: "There was an error while executing this command! rps",
      });
    }
  },
};

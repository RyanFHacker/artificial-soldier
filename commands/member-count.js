const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    Client,
    GatewayIntentBits,
    IntentsBitField,
    Colors,
  } = require("discord.js");
  const { guildId, token } = require("../prodConfig.json");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("member-count")
      .setDescription("Display the count of server members")
      .setDefaultMemberPermissions(PermissionFlagsBits.ViewChannel),
  
    async execute(interaction) {
      await interaction.deferReply({ ephemeral: true });
      try {
        const client = new Client({
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            IntentsBitField.Flags.Guilds,
            GatewayIntentBits.GuildMembers,
          ],
        });
        client.login(token);
        const guild = await client.guilds.fetch(guildId);
        const memberCount = guild.approximateMemberCount.toString()
 
        return await interaction.editReply({ content: memberCount });
      } catch (error) {
        console.error(error);
        return await interaction.editReply({
          content: "There was an error while executing this command! member-count",
        });
      }
    },
  };
  
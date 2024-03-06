const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  Guild,
  RoleManager,
  Client,
  GatewayIntentBits,
  IntentsBitField,
  Colors,
} = require("discord.js");
const { dadminId, guildId, token } = require("../prodConfig.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("create-role")
    .setDescription("create a group"),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
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
    // console.log(guild);
    // roleManager.create()
    // // Create a new role with data and a reason
    if (interaction.user.id == dadminId) {
      guild.roles.create({
        name: "AS-TestRole",
        color: Colors.Blue,
        reason: "Test Role by Artificial Soldier",
      });

      return await interaction.editReply({
        content:
          "maybe made group",
    });
    } else {
        return await interaction.editReply({
            content:
              "Seems this command isn't meant for you.",
        });
    }

  },
};

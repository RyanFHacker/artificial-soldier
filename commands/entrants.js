const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  Guild,
  RoleManager,
  GuildMemberManager,
  Client,
  GatewayIntentBits,
  IntentsBitField,
  Colors,
} = require("discord.js");
const { dadminId, guildId, token } = require("../prodConfig.json");
const SubjectsModel = require("../models/Subjects");
const Sequelize = require("sequelize");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("entrants")
    .setDescription("List all entrants")
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

      const uniqueEntrants = await SubjectsModel.findAll({
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("subject_id")), "subject_id"],
        ],
      });
      const guild = await client.guilds.fetch(guildId);
      let entrantList = "\n*Server Member Entrants*\n";
      let i = 0;

      while (i < uniqueEntrants.length) {
        let entrant_id = uniqueEntrants[i].subject_id;
        const entrant = await guild.members.fetch(entrant_id)
        entrantList += `${entrant}\n`
        i++;
      }     

      return await interaction.editReply({ content: entrantList });
    } catch (error) {
      console.error(error);
      return await interaction.editReply({
        content: "There was an error while executing this command! entrants",
      });
    }
  },
};

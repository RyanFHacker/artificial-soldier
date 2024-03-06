const { announcementChannel, token } = require("../prodConfig.json");
const { Client, GatewayIntentBits, IntentsBitField } = require("discord.js");

module.exports = {
  cronTime: "0 17 * 1,3,5,7,9,11 3", //12 PM on Wednesdays on odd months
  // cronTime: "* * * * *",
  // Send a message in a channel from config
  onTick: async function () {
    const client = new Client({
      intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        IntentsBitField.Flags.Guilds,
      ],
    });
    await client.login(token);
    console.log("I made an announcement")
    const announcement = "To all current and prospective Combat Research Subjects:\n\nThe time is once again upon you to fight for supremacy. Join your fellow combatants at Otaku Cafe and battle for survival and the benefit of our research. Registration and Rules for Entry are here <#1207141720924364820>\n\nHail Lord Bison!";
    const url = 'https://cdn.discordapp.com/attachments/874688076398624808/1214954562532933632/combat_research_2024.png?ex=65fafd9c&is=65e8889c&hm=fbd38b9f929d4dd558cca16c700af7de24bf81e59ae4b50374a584eb9efc549a&'
    
    client.on("ready", (client) => {
      const channel = client.channels.cache.get(announcementChannel);
      channel.send({content: announcement, files: [url]});

    });
  },
  onComplete: null,
  start: true,
};

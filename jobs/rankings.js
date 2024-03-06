const SubjectsModel = require("../models/Subjects");
const GamesModel = require("../models/Games");
const {rankingsChannel, token} = require("../prodConfig.json");
const {
  Client,
  GatewayIntentBits,
  IntentsBitField,
} = require("discord.js");
// gamesConfig.forEach((game) => {

module.exports = {
  cronTime: "0 12 * 1,3,5,7,9,11 4", //12 PM on Thursday on odd months
  // cronTime: "* * * * *",
  // Send a message in a rankings channel for each active game

  onTick: async function () {
    const client = new Client({
      intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        IntentsBitField.Flags.Guilds,
      ],
    });
    await client.login(token);

    const games = await GamesModel.findAll();
    for (const game of games) {
      const scores = await SubjectsModel.findAll({
        order: [["research_points", "DESC"]],
        attributes: ["subject_id", "research_points", "rank", "nickname"],
        where: { game_id: game.game_id },
      });
      
      const header = "```fix\nPOINTS  RANK  NAME\n";
      let scoreboard = `**${game.name}**${header}`
      let i = 0;
      while (i < scores.length) {
        let score = ("    " + scores[i].research_points).slice(-4);
        let rank = scores[i].rank ? "     " + scores[i].rank : "      ";
        let subject = "    " + scores[i].nickname;
        scoreboard += `${score}${rank}${subject}\n`;
        i++;
      }
      scoreboard += "```";
      client.on("ready", (client) => {
        const channel = client.channels.cache.get(rankingsChannel);
        channel.send(scoreboard);
      });
    }
  },
  onComplete: null,
  start: true,
};

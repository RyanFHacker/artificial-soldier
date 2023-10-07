const { SlashCommandStringOption } = require("discord.js");
const gamesConfig = require("../config/games.json");

class commonOptions {
  static getGameOptions() {
    let option = new SlashCommandStringOption();

    option
      .setName("game")
      .setRequired(true)
      .setDescription("Select the game in which you would like to register");

    gamesConfig.forEach((game) => {
      option.addChoices(game);
    });

    return option;
  }
}

module.exports = commonOptions;

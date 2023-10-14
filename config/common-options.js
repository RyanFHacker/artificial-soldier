const { SlashCommandStringOption } = require("discord.js");
const gamesConfig = require("../config/games.json");
const { v4: uuidv4 } = require("uuid");
const MatchesModel = require("../models/Matches");
const SubjectsModel = require("../models/Subjects");

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

  static async confirmMatch(match_id) {
    //get the match
    const match = await MatchesModel.findOne({
      where: {
        match_id: match_id
      },
    });
    //update winner and loser based on the scores, including bounties
    await SubjectsModel.increment(
      { research_points: +match.winner_points + match.bounty_points },
      {
        where: {
          subject_id: match.winner_id,
          game_id: match.game_id,
        },
      }
    );
    await SubjectsModel.increment(
      { research_points: +match.loser_points },
      {
        where: {
          subject_id: match.loser_id,
          game_id: match.game_id,
        },
      }
    );

    match.update({
      confirmed: true,
    });

    return match
  }
}

module.exports = commonOptions;

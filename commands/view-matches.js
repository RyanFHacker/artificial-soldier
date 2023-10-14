const { SlashCommandBuilder } = require("discord.js");
const Sequelize = require("sequelize");
const { getGameOptions } = require("../config/common-options.js");
const MatchesModel = require("../models/Matches");
const SubjectsModel = require("../models/Subjects");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("view-matches")
    .setDescription("Check all your matches in the current competition.")
    .addStringOption(getGameOptions()),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const subject = interaction.user;
    const game_id = interaction.options.getString("game");
    const getSubject = await SubjectsModel.findOne({
      where: { subject_id: subject.id, game_id: game_id },
    });
    try {
      // is this person registered for this game?
      if (!getSubject) {
        return await interaction.editReply({
          content: `You aren't registered for ${game_id}`,
        });
      } 
      else {
        const subjectsMatches = await MatchesModel.findAll({
          where: {
            game_id: game_id,
            [Sequelize.Op.or]: [
              { winner_id: getSubject.subject_id },
              { loser_id: getSubject.subject_id },
            ],
          },
        });

        let winnerHeader = ("WINNER").padEnd(18, ' ')
        let scoreboard = `\`\`\`fix\nRESULT  ${winnerHeader}PTS  BOUNTY  LOSER   PTS \n`;
        let i = 0;
        while (i < subjectsMatches.length) {
          let results = subjectsMatches[i].results;
          let winner_nickname = ("   " + subjectsMatches[i].winner_nickname).padEnd(19, ' ');
          let winner_points = ("  " + subjectsMatches[i].winner_points).padEnd(4, ' ');
          let bounty_points = ("    " + subjectsMatches[i].bounty_points).padEnd(5, ' ');
          let loser_nickname = ("    " + subjectsMatches[i].loser_nickname).padEnd(4, ' ');
          let loser_points = "    " + subjectsMatches[i].loser_points
          scoreboard += `${results}${winner_nickname}${winner_points}${bounty_points}${loser_nickname}${loser_points}\n`;
          i++;
        }
        scoreboard += "```";

        return await interaction.editReply({ content: scoreboard });
      }
    } catch (error) {
      console.error(error);
      return await interaction.editReply({
        content:
          "There was an error while executing this command! view-matches",
      });
    }
  },
};

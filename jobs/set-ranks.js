const config = require("../prodConfig.json");


module.exports = {
  // cronTime: "* * * * *",
  cronTime: "0 12 * 1,3,5,7,9,11 4", //12 PM on Thursday on odd months
  // Send a message in a channel from config
  onTick: async function () {
    const games = await GamesModel.findAll();
    const limit = 8;
    games.forEach(async (game) => {
      await SubjectsModel.update(
        { rank: "" },
        {
          where: { subject_id: { [Op.not]: null } },
        }
      );

      const getTopEight = await SubjectsModel.findAll({
        limit: 0 || limit,
        order: [["research_points", "DESC"]],
        attributes: ["subject_id", "research_points", "rank", "nickname"],
        where: { game_id: game.game_id },
      });
      let i = 0;
      while (i < getTopEight.length) {
        let userId = getTopEight[i].subject_id;
        let rank = i + 1;
        SubjectsModel.update(
          { rank: rank },
          {
            where: { subject_id: userId, game_id: game.game_id },
          }
        );
        i++;
      }
    });
  },
  onComplete: null,
  start: true,
};

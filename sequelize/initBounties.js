//for each game
//create 8 bounties
//start 1st place bounty as maxBounty for the game
//for each subsequent bounty, go down by 5, except for last 4, which only go down by 5 every other rank

const GamesModel = require("../models/Games");
const BountiesModel = require("../models/Bounties");

async function createBounties() {
    let games = await GamesModel.findAll()

    for (game of games) {
        let bounty = game.maxBounty
        for (let i = 0; i < 8; i++){
            BountiesModel.create({
                game_id: game.game_id,
                position_value: i+1,
                points: bounty
            });
            if (i != 4 && i != 6 ) {
                bounty = bounty - 5
            }
        }
    }
}

createBounties()
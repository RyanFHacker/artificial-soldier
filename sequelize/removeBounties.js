const Sequelize = require("sequelize");
const BountiesModel = require("../models/Bounties");

async function destroyBounties() {
    await BountiesModel.destroy({ where: { id: {[Sequelize.Op.ne]: null}}})
}

destroyBounties()

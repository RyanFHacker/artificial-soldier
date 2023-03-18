const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

module.exports = {
data: Matches = sequelize.define('matches', {
    match_id: Sequelize.STRING,
    results: Sequelize.TEXT,
    player0_id: Sequelize.DataTypes.STRING,
    player1_id: Sequelize.DataTypes.STRING,
    confirmed: Sequelize.DataTypes.BOOLEAN
})
}
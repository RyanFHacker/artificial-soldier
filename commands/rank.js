const { SlashCommandBuilder } = require('discord.js');
// Setup the top 8

const {Sequelize, Op } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Subjects = sequelize.define('subjects', {
    subject_id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
	confirmed: Sequelize.DataTypes.BOOLEAN,
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Reset the list of the top ranked players in the combat experiment.'),
	async execute(interaction) {
		const dadminId = "384240981521858561"
		if (interaction.user.id == dadminId) {
			await Subjects.update({ rank: undefined }, {
				where: { subject_id: {[Op.not]: null }}
			})
			const getTopEight = await Subjects.findAll({ limit: 8, order: [
				['research_points', 'DESC'],
			] });
			let ranked = ''
			var i = 0
			while (i < getTopEight.length) {
				let userId = getTopEight[i].subject_id
				let rank = i + 1
				await Subjects.update({ rank: rank }, {
					where: { subject_id: userId }
				});
				let fetchUser = await interaction.client.users.fetch(userId)
				ranked += `${rank} - ${fetchUser.username} - ${getTopEight[i].research_points}\n`
				i++
			}
			await interaction.reply({content: ranked, ephmeral: true});
		}
	},
};
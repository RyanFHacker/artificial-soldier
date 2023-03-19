const { SlashCommandBuilder, Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMembers,
	]
  });

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Subjects = sequelize.define('subjects', {
	subject_id: Sequelize.STRING,
	research_points: Sequelize.INTEGER,
	rank: Sequelize.INTEGER,
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('Display scoreboard'),
	async execute(interaction) {
		// Get a list of all subjects by score
		const scores = await Subjects.findAll({attributes: ['subject_id', 'research_points']})
		// let guild = client.guilds.cache.get('177525959010942976')
		// let member = guild.members.cache.get('384240981521858561')
		// guild.members.fetch()
		// client.guilds.cache.get
		// client.members.cache.get(384240981521858561)
		let scoreBoard = ''
		var i = 0
		while (i < scores.length) {
			// let subjectUser = client.members.cache.get(scores[i].subject_id)
			scoreBoard += `${scores[i].subject_id}${scores[i].research_points}\n`
			i++
		}
		await interaction.reply({content: scoreBoard, ephmeral: true});
	},
};
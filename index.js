const config = require("./config.json");
const fs = require('node:fs');
const path = require('node:path');
const Sequelize = require('sequelize');

const { Client, GatewayIntentBits, Collection, Events, IntentsBitField } = require('discord.js');

const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.MessageContent,
	  IntentsBitField.Flags.Guilds,
	  GatewayIntentBits.GuildMembers
	]
  });

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand() || (interaction.channelId != config.channelId)) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		process.on('unhandledRejection', error => {
			console.error('Unhandled promise rejection', error)
		})
		return await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection', error)
})

client.login(config.token);
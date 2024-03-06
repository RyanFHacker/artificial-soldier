const config = require("./prodConfig.json");
const fs = require("node:fs");
const path = require("node:path");
const { CronJob } = require("cron");

const {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  IntentsBitField,
  Partials,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    IntentsBitField.Flags.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const jobsPath = path.join(__dirname, "jobs");
const jobsFiles = fs
  .readdirSync(jobsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of jobsFiles) {
  const filePath = path.join(jobsPath, file);
  const job = require(filePath);
  if ("cronTime" in job) {
    new CronJob(
      job.cronTime,
      job.onTick,
      job.onComplete,
      job.start,
      job.timeZone
    );
  } else {
    console.log(
      `[WARNING] The job at ${filePath} is missing a required "data" property.`
    );
  }
}

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    process.on("unhandledRejection", (error) => {
      console.error("Unhandled promise rejection", error);
    });
    return await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  console.log("React")
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection", error);
});

client.login(config.token);

if (message.author.bot) return;
    if (!message.content.startsWith("!")) return;
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    // challenge between to members, list opposing member and match results
    if (command === "challenge") {
      if (args === null) return;
        // this should be a user
        // const opponent = args[
        //   {
        //     key: 'text',
        //     prompt: 'Name of Opponent',
        //     validate: text => {},
        //   }
        // ]
        const opponent = args[0]

        // this should be a match result
        const result = args[1]

        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply({content: `Please verify the result ${opponent} of ${result}`, ephmeral: true})
    }

    if (command === "verify") {
        
    }

    if (command === "commands") {
      message.reply("!challenge /n !verify")
    }


    const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console(),
    ],
});
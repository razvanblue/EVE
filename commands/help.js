const {Client} = require('discord.js');

module.exports = {
    name: "help",
    description: "Receive information about existing commands.",
    cooldown: 10,
    execute(message, args, client){
        data = "Nasod Queen Eve is here to help you."
        + "\nHere is a list of all the commands that I respond to:\n```";
        data += client.commands.map(cmd => cmd.name + ': ' + cmd.description).join('\n');
        data += "```\nYou can use these commands without any prefix or by tagging me at the beginning of the message."
        + "\nHandle me with care and please don't spam.";
        
        message.author.send(data)
        .then(() => {
            if (message.channel.type === 'dm') return;
            message.reply("I have sent you a DM.").then(rply => rply.delete(5000));
            message.delete().catch(() => {});
        })
        .catch(error => {
            console.error(`Could not sent DM to user ${message.author.tag}.\n`, error);
            message.reply("There has been a problem DM'ing you. I cannot cooperate in these conditions.\nPlease make sure you have DMs enabled.");
        });
    }
};
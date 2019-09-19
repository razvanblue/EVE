const {Client} = require('discord.js');

module.exports = {
    name: 'kick',
    aliases: [],
    description: 'Kick mentioned user',
    guildOnly: false,
    cooldown: 12,
    execute(message, args, client){
        
        // if(args.length == 0)
        //     return message.reply("Please specify a target.");
        if(args.includes(`<@${client.user.id}>`))
            return message.reply("That is impossible.");
        
        var userMatch = args.match(/<@!?(\d+)>/);
        if (userMatch == undefined)
            return message.reply("Please specify a target.")
                            .then(resp => {
                                message.delete();
                                resp.delete(5000);
                            });

        const user = client.users.get(userMatch[1]);
        message.guild.member(user).kick();
        message.channel.send(`User ${user} has been kicked out.`);
    }
};
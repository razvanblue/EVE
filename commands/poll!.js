const {Client, RichEmbed} = require('discord.js');

module.exports = {
    name: "poll!",
    aliases: ["poll:"],
    description: "Make a poll.",
    guildOnly: true,
    cooldown: 300,
    execute(message, args, client){
        
        if(args.length == 0)
            return message.reply("Please specify the poll's content.");

        const embed = new RichEmbed()
        .setAuthor(message.member.nickname, message.author.displayAvatarURL)
        .attachFiles(['./img/Eve_Head_Portrait.png'])
        .setThumbnail('attachment://Eve_Head_Portrait.png')
        .setDescription(args)
        .setTimestamp()
        .setFooter( "Poll request by " + message.author.tag);

        message.channel.send(embed)
        .then(poll => poll.react('👍')
            .then(() => poll.react('👎'))
        );
        message.delete();
    }
};
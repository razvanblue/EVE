const giphyToken = require('../config.json');
var giphy = require('giphy-api')(giphyToken);
const {Client, RichEmbed} = require('discord.js');

module.exports = {
    name: 'pat',
    aliases: [],
    description: 'Pat mentioned user',
    guildOnly: false,
    cooldown: 12,
    execute(message, args, client){
        
        if(args.length == 0)
            return message.reply("Please specify a target.");
        if(args.includes(`<@${client.user.id}>`))
            return message.reply("That is impossible.");

        target = args.replace(/\bme\b/ig, 'them').replace(/\bmy\b/ig, 'their');
        
        giphy.random('pat anime').then(function (res) {
            var embed = new RichEmbed();
            embed.setImage(res.data.image_original_url);
            message.channel.send(`${message.author} has ordered me to pat ${target}.`, embed);
        });
        message.delete();
    }
};
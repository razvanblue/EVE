const giphyToken = require('../config.json');
var giphy = require('giphy-api')(giphyToken);
const {Client, RichEmbed} = require('discord.js');

module.exports = {
    name: "punch",
    aliases: [],
    description: "Punch something",
    guildOnly: false,
    cooldown: 20,
    execute(message, args, client){
        if(args.length == 0)
            return message.reply("Please specify a target.");
        if(args.includes(`<@${client.user.id}>`))
            return message.reply("why do you wish to punish me?");

        target = args.replace(/me/ig, 'them').replace(/my/ig, 'their');
        
        giphy.random('punch').then(function (res) {
            var embed = new RichEmbed();
            embed.setImage(res.data.image_original_url);
            message.channel.send(`${message.author} has ordered me to punch ${target}!`, embed);
        });
        message.delete();
    }
};
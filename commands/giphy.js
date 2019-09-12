const giphyToken = require('../config.json');
var giphy = require('giphy-api')(giphyToken);
const {Client, RichEmbed} = require('discord.js');

module.exports = {
    name: "giphy",
    aliases: [],
    description: "Search on giphy",
    guildOnly: false,
    cooldown: 5,
    execute(message, args, client){
        if(args.length == 0)
            return message.reply("Please specify a search term.");
        giphy.random({tag: args, rating: 'r'}).then(function (res) {
            var embed = new RichEmbed();
            embed.setImage(res.data.image_original_url);
            embed.setTitle(args);
            message.reply(embed);
        });
        message.delete();
    }
};
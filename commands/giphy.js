var giphy = require('giphy-api')('vM1OQdMtu42byM0vOmTTaH7wFwPc7Pma');
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
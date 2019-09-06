var giphy = require('giphy-api')('vM1OQdMtu42byM0vOmTTaH7wFwPc7Pma');
const {Client, RichEmbed} = require('discord.js');

module.exports = {
    name: 'hug',
    aliases: [],
    description: 'Hug mentioned user',
    guildOnly: false,
    cooldown: 12,
    execute(message, args, client){
        
        if(args.length == 0)
            return message.reply("Please specify a target.");
        if(args.includes(`<@${client.user.id}>`))
            return message.reply("That is impossible.");

        target = args.join(' ').replace(/\bme\b/ig, 'them').replace(/\bmy\b/ig, 'their');
        
        giphy.random('hug').then(function (res) {
            var embed = new RichEmbed();
            embed.setImage(res.data.image_original_url);
            message.channel.send(`${message.author} has ordered me to hug ${target}.`, embed);
        });
        message.delete();
    }
};
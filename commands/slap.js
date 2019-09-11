var giphy = require('giphy-api')('vM1OQdMtu42byM0vOmTTaH7wFwPc7Pma');
const {Client, RichEmbed} = require('discord.js');

module.exports = {
    name: 'slap',
    aliases: [],
    description: 'Slaps mentioned user',
    guildOnly: false,
    cooldown: 12,
    execute(message, args, client){
        
        if(args.length == 0)
            return message.reply("Please specify a target.");
        if(args.includes(`<@${client.user.id}>`))
            return message.reply("why do you wish to punish me?");

        target = args.replace(/me/ig, 'them').replace(/my/ig, 'their').replace(/myself/ig, 'themselves');
        
        giphy.random('slap').then(function (res) {
            var embed = new RichEmbed();
            embed.setImage(res.data.image_original_url);
            message.channel.send(`${message.author} has ordered me to slap ${target}!`, embed);
        });
        message.delete();
    }
};
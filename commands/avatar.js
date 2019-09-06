const {Client, RichEmbed} = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: ["icon", "pfp"],
    description: "Show target user's avatar.",
    guildOnly: false,
    cooldown: 5,
    execute(message, args, client){
        var avatarList = message.mentions.users.map(user => {
            let embed = new RichEmbed({
                title: `${user.username}'s avatar`,
              });
              embed.setImage(user.displayAvatarURL);
            return embed;
        });
        if (avatarList[0] == undefined){
            avatarList[0] = avatarEmbed(message.author);
        }

        avatarList.forEach(embed => {
            message.channel.send(embed);
        });
        // message.delete().catch(() => {});
    }
};

function avatarEmbed(user){
    let embed = new RichEmbed({
        title: `${user.username}'s avatar`,
    });
    embed.setImage(user.displayAvatarURL);
    return embed;
}
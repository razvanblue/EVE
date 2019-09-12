//Imports
const fs = require('fs');
const {Collection, Client} = require('discord.js');
const {discordToken} = require('./config.json');
aimlHigh = require('aiml-high');
const profile = require('./profile.json');
var {greetings, greet} = require('./wordutils.js');


//Initialize Discord Client and AIML Interpreter
const client = new Client();
client.commands = new Collection();
const cooldowns = new Collection();
const aimlInterpreter = new aimlHigh(profile, 'Take care.');

//Load aiml files
const aimlFiles = fs.readdirSync('./aiml/alice');
const aimlFilePaths = aimlFiles.map(file => `./aiml/alice/${file}`)
aimlInterpreter.loadFiles(aimlFilePaths);

//Set commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (var file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    if (command.hasOwnProperty('cooldown'))
        cooldowns.set(command.name, new Collection());
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

//Greet new members
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'pussychat');
    if (channel){ 
        channel.send(greet(member.user));
    }
})

var respond = function(answer, wildCardArray, input) {
    console.log(answer);
}

//Command handler
client.on('message', message => {
    if (message.author.bot) return;
    if(!message.channel.memberPermissions(message.guild.me).has('SEND_MESSAGES'))
        return message.author.send(`I don't have permission to send messages in #${message.channel.name}.`).catch(() => {});

        //Check for command
    const commandMatch = message.content.match(/^(<@616544855170089000>)?\s*[a-z]+[:!]?[\s$]/i);
    if (commandMatch == null) return;
    
    const commandName = commandMatch[0].replace(`<@${client.user.id}>`, '').trim();
    const args = message.content.slice(commandMatch[0].length);
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (command == undefined) {
        if (message.content.startsWith('<@616544855170089000>'))
            aimlInterpreter.findAnswer(message.content.slice('<@616544855170089000>'.length + 1),respond);
        return;
    }
    
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply("I can't execute that command inside DMs!").catch(() => {});
    }

    console.log(`sender: ${message.author} | message: ${message.content}`);

    const authorId = message.author.id;
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    //Check if command is on cooldown
    if(timestamps.has(authorId)){
        const expirationTime = timestamps.get(authorId) + cooldownAmount;
        if (now < expirationTime){
            const timeLeft = Math.ceil((expirationTime - now) / 1000);
            return message.reply(`please calm down. Wait ${timeLeft} more second${timeLeft==1 ? '':'s'} before reusing the \`${command.name}\` command.`)
            .then(sentReply => { message.delete(); sentReply.delete(3000); });
        }
    }
    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
    }
    timestamps.set(authorId, now);
    setTimeout(() => timestamps.delete(authorId), cooldownAmount);
})

client.login(discordToken);
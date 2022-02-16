// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const {authorNamePredicate} = require("@discordjs/builders");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});


client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const { commandName } = interaction;



    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply('Server info.');
    } else if (commandName === 'user') {
        await interaction.reply('User info.');
    }else if (commandName === 'meetup') {
        interaction.guild.members.cache.forEach(member => { // Looping through each member of the guild.
            // Trying to send a message to the member.
            // This method might fail because of the member's privacy settings, so we're using .catch
            member.send("What did you do yesterday ?").catch(e => console.error(`Couldn't DM member ${member.user.tag}`));
            client.on ('messageCreate', async message => {
                client.send("and now what do you plan to do ?").catch(e => console.error(`didnt respond ${member.tag}`))
            })
        });
    }
});

// Login to Discord with your client's token
client.login(token);
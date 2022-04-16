const { SlashCommandBuilder, memberNicknameMention} = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('meetup').setDescription('Replies in direct message'),
    new SlashCommandBuilder().setName('cheeros').setDescription('Give a cheer to your coworker').addUserOption(option =>
        option.setName("member")
            .setDescription("target of the cheeros")
            .setRequired(true)
            )

]
    .map(command => command.toJSON());


const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
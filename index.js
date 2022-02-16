const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'OTQzNDI4NjY1OTk0MjQ4MjIy.Ygy6ag.8IrXOjs_9WmN76i36b1RGXXnuWg';

client.once('ready', () => {
    console.log('Félicitations, votre bot Discord a été correctement initialisé !');
});

client.login(token);

client.on("message", message => {
    if (message.content === "!ping") {
        message.channel.send("Pong.")
    }
})
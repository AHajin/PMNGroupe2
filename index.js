// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const fileSystem = require("fs")
const { token, guildId, host,user,password, database} = require('./config.json');
let mysql = require('mysql');


let con = mysql.createConnection({
    host : host,
    user : user,
    password : password,
    database: database
})

let response = {
    response : []

};

function writeJson(){
    let toJson = JSON.stringify(response);
    fileSystem.writeFile('./response.json', toJson, err=>{
        if(err){
            console.log("failed to register");
        }else{
            console.log("JSON data written");
        }
    })
}

// Create a new client instance
const client = new Client({ intents: [
        Intents.FLAGS.DIRECT_MESSAGES, //required to interact in dms
        Intents.FLAGS.GUILDS, // required to interact with the guild
    Intents.FLAGS.GUILD_MEMBERS //required to acquire all guild members as list
    ],partials: [
        'CHANNEL', //required to receive dm
    ] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready to work!')
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

});

client.on("messageCreate", msg =>{
    const channel = client.channels.cache.find(channel => channel.id === `959904868355674193`)

console.log('Event');
    if(msg.channel.type === 'DM' && msg.author.id !== '943444812747669504') {
        console.log('Event');
            msg.author.send(`Thanks for you commitment <@${msg.author.id}>! we'll catch you later!`).catch(e => console.error(`Couldnt DM member ${msg.author.tag}`));
            let date = new Date(msg.createdTimestamp);
            console.log(date)


            //channel.send(`**id_User : ${msg.author.id},\nUsername : ${msg.author.username},\nmessageContent : ${msg.content},\ndate : ${date}\n\n\n**`);
            /*response.response.push({id_user : msg.author.id,name_user: msg.author.username, response_obj : msg.content, timestamp: msg.createdTimestamp});
            writeJson();*/
        //}

response.response.push({id_user : msg.author.id,name_user: msg.author.username, response_obj : msg.content, time: date});
writeJson();
        const sql = `INSERT INTO response (id_user, name_user, response_obj, time) VALUES ("${msg.author.id}", "${msg.author.username}", "${msg.content}", "${msg.createdTimestamp}")`;
        try{
            con.query(sql)
        }catch (e) {
            console.log(e)
        };


return;

    }
console.log(response.response);

})



client.on('interactionCreate',  interaction => {



    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'meetup') {
        interaction.reply(`Meetup launched!`);
        //console.log(interaction.guild.members.list()) //debug
// First use guild.members.fetch to make sure all members are cached
        interaction.guild.members.fetch({ withPresences: true }).then(members =>{
            members.forEach(members => { // Looping through each member of the guild.
                // Trying to send a message to the member.
                // This method might fail because of the member's privacy settings, so we're using .catch

                if(members.id !== '943444812747669504'&& members.id !== '159985870458322944' && members.id !== '432610292342587392' && members.id !== '468281173072805889' && members.id !== '571027211407196161' && members.id !== '887361046032023562' ){
                    members.send("What did you do yesterday ?");
                    console.log(`${members.user.username} have been DMed`);
                    console.log(members.user.id,members.user.username,members.user.tag)
                }

                else{
                     console.log(`couldnt dm ${members.id}`)// DM closed or Bot himself

                }
            });
        });
    }
        });

// Login to Discord with your client's token
client.login(token);
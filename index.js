// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const fileSystem = require("fs")
const { token, guildId, host,user,password, database} = require('./config.json');
let mysql = require('mysql');
let step = null
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const fs = require("fs");
let workers = {
    worker: []
}

let con = mysql.createConnection({
    host : host,
    user : user,
    password : password,
    database: database
})

let response = {
    response : []
};

function writeJsonResponse(){
    let toJson = JSON.stringify(response);
    fileSystem.writeFile('./response.json', toJson, err=>{
        if(err){
            console.log("failed to register");
        }else{
            console.log("JSON data written");
        }
    })
}
function writeJsonWorkers(){
    let toJson = JSON.stringify(workers);
    fileSystem.writeFile('./scrum.json', toJson, err=>{
        if(err){
            console.log("failed to register");
        }else{
            console.log("JSON data written");
        }
    })
}
function readWorkers(){

/*    fileSystem.readFile('./scrum.json', err => {
        if(err){
            console.log("failed to read");
        }else{
            console.log("JSON date read")
        }

    })*/

    let workers = fs.readFileSync('./scrum.json')
    return JSON.parse(workers)
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

    console.log(step)
});

client.on("messageCreate", msg =>{
    const channel = client.channels.cache.find(channel => channel.id === `959904868355674193`)


    let date = new Date(msg.createdTimestamp);
    console.log(date)

console.log('Event');
    console.log(step)
   // console.log(employee.id_user,employee.step,employee.name_user)
    if(msg.channel.type === 'DM' && msg.author.id !== '943444812747669504') {
        //console.log(workers.worker.id_user,workers.worker.step);
        if(step === 1){
            console.log(step)
            msg.author.send(`and what are you planning to do today ?`).catch(e => console.error(`Couldnt DM member ${msg.author.tag}`));
            step++
        }else if(step === 2){
            console.log(step)
            msg.author.send(`Thank you ! Now you can prepare for the scrum meeting !`).catch(e => console.error(`Couldnt DM member ${msg.author.tag}`));
            step++
        }else if(step === 3){
            console.log(step)
            msg.author.send('oops');
            step= 0
        }else {
            msg.author.send(`Thanks for you commitment <@${msg.author.id}>! we'll catch you later!`).catch(e => console.error(`Couldnt DM member ${msg.author.tag}`));

        }
        /*console.log('Event');
            msg.author.send(`Thanks for you commitment <@${msg.author.id}>! we'll catch you later!`).catch(e => console.error(`Couldnt DM member ${msg.author.tag}`));*/



            //channel.send(`**id_User : ${msg.author.id},\nUsername : ${msg.author.username},\nmessageContent : ${msg.content},\ndate : ${date}\n\n\n**`);
            /*response.response.push({id_user : msg.author.id,name_user: msg.author.username, response_obj : msg.content, timestamp: msg.createdTimestamp});
            writeJson();*/
        //}
/*
response.response.push({id_user : msg.author.id,name_user: msg.author.username, response_obj : msg.content, time: date});
writeJsonResponse();
        writeJsonWorkers()*/
        const updateWorkers = `UPDATE workers SET step = "${step}" where id_user = "${msg.author.id}"`
        const sql = `INSERT INTO response (id_user, name_user, response_obj, time, step) VALUES ("${msg.author.id}", "${msg.author.username}", "${msg.content}", "${msg.createdTimestamp}","${step}")`;
        try{
            con.query(sql)
            con.query(updateWorkers)
        }catch (e) {
            console.log(e)
        };
return;

    }
console.log(response.response);

})



client.on('interactionCreate',  interaction => {

    if (!interaction.isCommand()) return;

    const { commandName, userId} = interaction;

    if (commandName === 'meetup') {
        interaction.reply(`Meetup launched!`);
        step = 1
        console.log(step);
        //console.log(interaction.guild.members.list()) //debug
// First use guild.members.fetch to make sure all members are cached
        interaction.guild.members.fetch({ withPresences: true }).then(members =>{
            members.forEach(members => { // Looping through each member of the guild.
                // Trying to send a message to the member.
                // This method might fail because of the member's privacy settings, so we're using .catch

                if(members.id !== '943444812747669504' && members.id !== '159985870458322944' && members.id !== '432610292342587392' && members.id !== '468281173072805889' && members.id !== '571027211407196161' && members.id !== '887361046032023562' ){


                    try{
                        const insert = `INSERT INTO workers (id_user,username,step,id_guild) VALUES ("${members.id}","${members.user.username}",1,"${interaction.guild.id}")`;
                        con.query(insert);

                    }catch (e){
                        const search = `SELECT id_user= "${members.id}" FROM workers`;
                        con.query(search);
                    }
                    console.log(`${members.user.username} have been DMed`);
                    console.log(members.user.id,members.user.username,members.user.tag)
                    workers.worker.push({id_user : members.id,name_user: members.user.username, step: 1});
                    writeJsonWorkers();
 //members.send("What did you do yesterday ?");

                }

                else{
                     console.log(`couldnt dm ${members.id}`)// DM closed or Bot himself

                }
            });
        });
    }else if (commandName === 'cheeros') {
        interaction.reply(`cheeros launched!`);
        //console.log(interaction.guild.members.list()) //debug
// First use guild.members.fetch to make sure all members are cached
        interaction.guild.members.fetch({ withPresences: true }).then(members =>{
            members.forEach(members => { // Looping through each member of the guild.
                // Trying to send a message to the member.
                // This method might fail because of the member's privacy settings, so we're using .catch

                if(members.id === '316960380515516426'){
                    members.send("totalement oui, je test un trucs avec des flags");
                }else if(members.id === '209822631900217344' && members.id !== '943444812747669504' && members.id !== '159985870458322944' && members.id !== '432610292342587392' && members.id !== '468281173072805889' && members.id !== '571027211407196161' && members.id !== '887361046032023562' ) {
                    members.send("What did you do yesterday ?");
                    console.log(`${members.user.username} have been DMed`);
                    console.log(members.user.id, members.user.username, members.user.tag)
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
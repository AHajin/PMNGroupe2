// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js')
const fileSystem = require("fs")
const { token, guildId, host,user,password, database} = require('./config.json')
let mysql = require('mysql')
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders')
const cron = require("cron")


let con = mysql.createConnection({
    host : host,
    user : user,
    password : password,
    database: database
})
let step = null

function stepVerif(msg){
    const search = `SELECT step FROM workers WHERE id_user= "${msg.author.id}"`
    con.query(search, (err, result) => {
        //console.log(result[0].step)
        step = result[0].step
        //console.log(step)
        //if (step === 1)
            //console.log("a")

        //console.log(step, msg.author.username )

        // step to check at what step the member is between phase 1 & 3(0)
        if(step === 1){
            console.log(step)
            msg.author.send(`and what are you planning to do today ?`).catch(e => console.error(`Couldnt DM member ${msg.author.tag}`))
        }else if(step === 2){
            console.log(step)
            msg.author.send(`Thank you ! Now you can prepare for the scrum meeting !`).catch(e => console.error(`Couldnt DM member ${msg.author.tag}`))
        }else if(step === 3){
            console.log(step)
            step = 0
            //msg.author.send(`Thanks for you commitment <@${msg.author.id}>! we'll catch you later!`).catch(e => console.error(`Couldnt DM member ${msg.author.tag}`))

        }else {
            //msg.author.send(`Thanks for you commitment <@${msg.author.id}>! we'll catch you later!`).catch(e => console.error(`Couldnt DM member ${msg.author.tag}`))

        }
        //console.log('Event')
        const sql = `INSERT INTO response (id_user, name_user, response_obj, time, step) VALUES ("${msg.author.id}", "${msg.author.username}", "${msg.content}", "","${step}")`
        if(step !== 0)step++

        const updateWorkers = `UPDATE workers SET step = "${step}" where id_user = "${msg.author.id}"`

        try{
            if(step > 0)
                con.query(sql)
            con.query(updateWorkers)
        }catch (e) {
            console.log(e)
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
    ] })

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready to work!')

    //Connection to database
    con.connect(function(err) {
        if (err) throw err
        console.log("Connected!")
    })

    //console.log(step)
})

//Bot DM Interaction
client.on("messageCreate", msg =>{
    const channel = client.channels.cache.find(channel => channel.id === `959904868355674193`)
    if(msg.channel.type === 'DM' && msg.author.id !== '943444812747669504') {
        console.log("event")
        stepVerif(msg)
    }
})

//slash command in servers
client.on('interactionCreate',  interaction => {

    if (!interaction.isCommand()) return
    const channel = client.channels.cache.find(channel => channel.id === `983719112935096391`)

    const { commandName, userId} = interaction


    // slash command 'meetup'
    if (commandName === 'meetup') {
        interaction.reply(`Meetup launched!`)
        step = 1
        //console.log(step)
        let scheduledMessage = new cron.CronJob('00 05 09 * * 1-5', () => {

            //message in a specific channel that meetup is launched
            channel.send(`Meetup is going on`)

            //fetch all members and add them to the cache
            interaction.guild.members.fetch({ withPresences: true }).then(members =>{
                members.forEach(members => { // Looping through each member of the guild.
                    // This method might fail because of the member's privacy settings, so we're using .catch

                    // Trying to send a message to the member.
                    // Filter to avoid bots
                    if(members.id !== '368105370532577280' && members.id !== '943444812747669504' && members.id !== '159985870458322944' && members.id !== '432610292342587392' && members.id !== '468281173072805889' && members.id !== '571027211407196161' && members.id !== '887361046032023562' ){


                        const insert = `INSERT INTO workers (id_user,username,step,id_guild) VALUES ("${members.id}","${members.user.username}",1,"${interaction.guild.id}")`
                        con.query(insert, (err, res)=>{
                            const search = `SELECT id_user= "${members.id}" FROM workers`
                            con.query(search, (err, res)=>{
                                const updateWorkers = `UPDATE workers SET step = 1 where id_user = "${members.id}"`
                                con.query(updateWorkers)
                            })
                        })


                        //console.log(`${members.user.username} have been DMed`)
                        //console.log(members.user.id,members.user.username,members.user.tag)
                        members.send("What did you do yesterday ?").catch(e => console.error(`Couldnt DM member ${members.user.id,members.user.username,members.user.tag} Their DM are closed`))
                    }
                    else{
                        console.log(`couldnt dm ${members.id}. is a bot.`)// DM closed or Bot himself
                    }
                })
            })
        })

        //launch daily task
        scheduledMessage.start()

    }
    // slash command 'cheerosteam'
    else if (commandName === 'cheerosteam') {

        interaction.reply(`cheeros launched!`)
        //console.log(interaction.guild.members.list()) //debug
        // First use guild.members.fetch to make sure all members are cached
        interaction.guild.members.fetch({ withPresences: true }).then(members =>{
            members.forEach(members => { // Looping through each member of the guild.
                // Trying to send a message to the member.
                if(members.id !== '368105370532577280' && members.id !== '862102568146567188' && members.id !== '943444812747669504' && members.id !== '159985870458322944' && members.id !== '432610292342587392' && members.id !== '468281173072805889' && members.id !== '571027211407196161' && members.id !== '887361046032023562' )
                {
                    members.send(`${interaction.user.username} want to cheers you, keep up the good work !`).catch(e => console.error(`Couldnt DM member ${members.id}\n${members.nickname}`))
                    //console.log(`${members.user.username} have been DMed`)
                    //console.log(members.user.id, members.user.username, members.user.tag)
                }
            else{
                    console.log(`couldnt dm ${members.id}. Their DM is closed or is a bot.`)// DM closed or Bot himself
                }
            })
        })
    }


})

// Login to Discord with your client's token
client.login(token)
const Discord = require('discord.js');
const client = new Discord.Client()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./dataBase/ConfigServer.json')
const db = low(adapter)

const bot = new Discord.Client();
const crystol = require("crystolnetwork-log");
const config = require("./Config/config.json")

//------------------------------------------

client.on("ready", () =>{
    console.log('Estou Online!')
    crystol.log("inicialização concluida com sucesso!", "./logs/events.log")
    client.user.setActivity("//help", { type: "WATCHING" })
})

client.on("guildCreate", (guild) => {
    db.set(`${guild.id}`, {
        suggestChannel: -1, 
        punishmentChannel: "punishmentChannel",
        feedbackChannel: "feedbackChannel",
        muteTag: "muteTag"

    }, ).write() 
})

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

   const args = message.content
       .trim().slice(config.prefix.length)
       .split(/ +/g);
   const command = args.shift().toLowerCase();
    try {
        let funnycommandFile = require (`./Commands/funny/${command}.js`);
        delete require.cache [require.resolve(`./Commands/funny/${command}.js`)];
        return funnycommandFile.run(client, message, args);
        
    }   catch (err) {
        console.error("Erro:" + err);
    }
    try{
        let modcommandFile = require (`./Commands/admin/${command}.js`);
        delete require.cache [require.resolve(`./Commands/admin/${command}.js`)];
        return modcommandFile.run(client, message, args);
    }   catch (err) {
        console.error("Erro:" + err);
    }
    try{
        let configcommandFile = require (`./Commands/configuracao/${command}.js`);
        delete require.cache [require.resolve(`./Commands/configuracao/${command}.js`)];
        return configcommandFile.run(client, message, args);
    }   catch (err) {
        console.error("Erro:" + err);
    }
    try{
        let infocommandFile = require (`./Commands/info/${command}.js`);
        delete require.cache [require.resolve(`./Commands/info/${command}.js`)];
        return infocommandFile.run(client, message, args);
    }   catch (err) {
        console.error("Erro:" + err);
    }
});


//--------------------------------------------

//require('./Config/moduleloader.js')(client, Discord, fs)
//client.command = new Discord.Collection(), client.aliases = new Discord.Collection()

//---------------------------------------------

client.login('SEU TOKEN') 
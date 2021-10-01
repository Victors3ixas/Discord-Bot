const Discord = require("discord.js");

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./dataBase/ConfigServer.json')
const db = low(adapter)

exports.run = async (client, message, args) => {
const punishment_channel = args[0]

if (message.member.permissions.has("MANAGE_GUILD")){
    if (!punishment_channel) {
        return message.channel.send(`${message.author.username}, coloque o ID do canal após o comando!`)
    } 
    else {
        var channel = message.guild.channels.cache.find(ch => ch.id === punishment_channel);
        if (channel != null) {
            db.get(message.guild.id).assign({punishmentChannel: punishment_channel}).write()
            return message.channel.send(`Canal adicionado com sucesso.`)
        }
        else {
            return message.channel.send(`Insíra uma valor de ID de canal válido após o comando!`)
        }
    }
}else {
    return message.channel.send(`${message.author.username}, Você não tem permissão para executar este comando!`)
}
}
const Discord = require('discord.js');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./dataBase/ConfigServer.json')
const db = low(adapter)

exports.run = async (client, message, args) => {

var canal = message.guild.channels.cache.find(ch => ch.id === db.get(message.guild.id).get("punishmentChannel").value());

if(!message.member.hasPermission('KICK_MEMBERS'))
    return message.reply("Você não tem permissões para usar este comando.");
let member = message.mentions.members.first();
if(!member)
    return message.reply("Por favor, mencione um usuário válido.");
if(!member.bannable) 
    return message.reply("Eu não posso banir este usuário! Ele pode ter um cargo maior que o meu, ou eu não tenha permissão pra banir!");
let reason = args.slice(1).join(' ');
if(!reason) reason = "Motivo não inserido. ";
await member.ban({ days: 7, reason: 'They deserved it' })
    .catch(error => message.reply(`Desculpe ${message.author} não consegui banir o membro devido ao : ${error}`));
if (canal != "punishmentChannel") {
    message.channel.send(`${member.user.tag} foi banido por ${message.author.tag}.`)
    const msg = new Discord.MessageEmbed()
        .setAuthor("Sistema de punição | Banido", client.user.avatarURL())
        .setColor("#d55959")
        .addField("👤 | Usuário Banido:", `→ Tag: ${member.tag} \n→ ID: ${member.id}`)
        .addField("👮‍♂️ | Autor do banimento:", `→ Tag: ${message.author.tag} \n→ ID: ${message.author.id}`)
        .addField("📋 | Motivo:", `${reason}`)
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()
    await canal.send(msg)
} 
if (canal == "punishmentChannel") {
    message.reply(`${member.user.tag} foi banido por ${message.author.tag}.\n //punishment_channel <ID do canal> para setar um canal de punições.`)
}
}


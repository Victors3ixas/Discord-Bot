const Discord = require('discord.js');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./dataBase/ConfigServer.json')
const db = low(adapter)

//const ms = require("ms");

module.exports = {
    name: "mute",
    description: "Mutesd a member for a given time",

    async run (client, message, args) {

    const muteRoleId = message.guild.roles.cache.get('838885148195684412')
    let muteRole;
    
    var canal = message.guild.channels.cache.find(ch => ch.id === db.get(message.guild.id).get("punishmentChannel").value());


    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
      return message.channel.send('Por favor, mencione um membro ou insira uma ID válido.');
    if (member === message.member)
      return message.channel.send('Você não pode se mutar, bobinho(a)..');
    if (member.id === client.user.id) return message.channel.send(message, 0, '😡 Esta tentando me mutar?');
    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send('Você não pode mutar alguem com tag maior que a sua.');
    if (!args[1])
      return message.channel.send('Insira um período de 14 dias ou menos (1s / m / h / d)');
    let time = (args[1]);
    if (!time || time > 1209600000) // Cap at 14 days, larger than 24.8 days causes integer overflow
      return message.channel.send('Insira um período de 14 dias ou menos (1s / m / h / d)');



    let reason = args.slice(2).join(' ');
    if (!reason) reason = 'Motivo não inserido';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    if (member.roles.cache.has(muteRoleId))
      return message.channel.send('O membro fornecido já está silenciado');

    // Mute member
    try {
      await member.roles.add(muteRoleId);
    } catch (err) {
      console.log(err)
      return message.channel.send('Verifique a hierarquia de tags', err.message);
    }


    const muteEmbed = new Discord.MessageEmbed()
      .setAuthor("Sistema de punição | Silenciado", client.user.avatarURL())
      .setColor("#d55959")
      .addField("👤 | Usuário Banido:", `→ Tag: ${member.tag} \n→ ID: ${member.id}`)
      .addField("👮‍♂️ | Autor do banimento:", `→ Tag: ${message.author.tag} \n→ ID: ${message.author.id}`)
      .addField("⌚ | Tempo:", "→ `" + `${(time)}` + "`")
      .addField("📋 | Motivo:", `${reason}`)
      .setThumbnail(message.author.avatarURL())
      .setTimestamp()
    canal.send(muteEmbed);

    // Unmute member
    member.timeout = message.client.setTimeout(async () => {
      try {
        await member.roles.remove(muteRole);
        const unmuteEmbed = new MessageEmbed()
          .setTitle('Unmute Member')
          .setDescription(`${member} has been unmuted.`)
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(unmuteEmbed);
      } catch (err) {
        console.log(err)
        return message.channel.send('Please check the role hierarchy', err.message);
      }
    }, time);
  }
};
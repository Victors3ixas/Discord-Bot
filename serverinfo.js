const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " dia" : " dias") + " atrás";
}

message.delete();
const memberfild = `⠀<:Online:835629716433797221>  ${message.guild.members.cache.filter(member => member.presence.status !== "offline").size}\n⠀<:Offline:835629716391723008>  ${message.guild.members.cache.filter(member => member.presence.status == "offline").size}`
const date = message.channel.guild.createdAt
const channels = message.guild.channels.cache;

const msg = await message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor("Informações do Servidor", "https://media.discordapp.net/attachments/132632676225122304/835597050758430730/discord.png?width=102&height=102")
    .setColor("#004d81")
    .addFields({name: "💻 ID do servidor:", value: `${message.guild.id}`, inline: true},
        {name: "<:Coroa:835629717053767720> Posse:", value: `${message.guild.owner.user.tag} (${message.guild.owner.id})`, inline: true},
        {name: "<:Shard:835629716563427368> Shard:", value: `${message.guild.shardID}`, inline: true},
        {name: "<:Tempo:835631359867355196> Criado há:", value: `⠀${formatDate('DD/MM/YYYY às HH:mm:ss', date)}\n⠀${checkDays(message.channel.guild.createdAt)}`, inline: false},
        {name: "👤 Membros:", value: `${memberfild}`, inline: true},
        {name: "<:Canais:835631359078039552> Canais", value: `⠀Texto: ${channels.filter(channel => channel.type === 'text').size}\n⠀Voz: ${channels.filter(channel => channel.type === 'voice').size}`, inline: true},
    ).setThumbnail(message.guild.iconURL())
)

function formatDate (template, date) {
    var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
    date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
    return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
      return template.split(specs[i]).join(item)
    }, template)
  }

}
const Discord = require('discord.js');

exports.run = async (client, message, args) => {

var list = [
    'https://i.imgur.com/HYJHoG7.gif',
    'https://i.imgur.com/9GxTsgl.gif',
    'https://i.imgur.com/uwHDm3r.gif',
    'https://i.imgur.com/mT4VjD6.gif',
    'https://i.imgur.com/w66ZqGR.gif',
    'https://i.imgur.com/oSoudVd.gif',
    'https://i.imgur.com/1FyrbwB.gif',
    'https://i.imgur.com/T9w8eFV.gif',
    'https://i.imgur.com/nuDmQu5.gif',
    'https://i.imgur.com/wlLCjRo.gif',
    'https://i.imgur.com/wYnmA4s.gif',
    'https://i.imgur.com/o5SrT0V.gif',
    'https://i.imgur.com/7CpOrix.gif',
    'https://i.imgur.com/g8A6W8t.gif',
    'https://i.imgur.com/53HB9hD.gif',
    'https://i.imgur.com/DSZkQIE.gif',
    'https://i.imgur.com/nfUoFmw.gif',
    'https://i.imgur.com/dBdzURK.gif',
    'https://i.imgur.com/CqCz3AN.gif',
    'https://i.imgur.com/tDBeeG5.gif',
    'https://i.imgur.com/F7WGcpa.gif',
    'https://i.imgur.com/RFWNaoF.gif',
];

var ação = [
    'bufetar',
    'estapear',
    'tapear',
]

var randAção = ação[Math.floor(Math.random() * ação.length)];
var randAção2 = ação[Math.floor(Math.random() * ação.length)];
var rand = list[Math.floor(Math.random() * list.length)];
var rand2 = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
const mentionUser= message.mentions.users.first()
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para abraçar!');
}

let avatar = message.author.displayAvatarURL({format: 'png'});
const embed = await message.channel.send(
  new Discord.MessageEmbed()
  .setColor('#ff0e0e')
  .setDescription(`${message.author} acaba de ${randAção} ${mentionUser}`)
  .setImage(rand)
  .setFooter(`Reaja com 🤬 para ${randAção2} também. .`)
  .setAuthor(message.author.tag, avatar)
)
const emojis = ["🤬"];

for (const i in emojis) {
  await embed.react(emojis[i])
}

const heartFilter = (reaction, user) => reaction.emoji.name === '🤬' && user.id === mentionUser.id;
    heart = embed.createReactionCollector(heartFilter);

heart.on('collect', r2 => {
  const resposta = new Discord.MessageEmbed()
    .setColor('#f0f586')
    .setDescription(`${mentionUser} acaba retribuir os tapas de ${message.author}`)
    .setImage(rand2)
    .setAuthor(mentionUser.tag, mentionUser.avatarURL())
  message.channel.send(resposta)
})
}
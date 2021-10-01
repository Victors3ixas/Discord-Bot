const Discord = require('discord.js');

exports.run = async (client, message, args) => {

var list = [
  'https://imgur.com/iclUiUN.gif',
  'https://imgur.com/lYQt9rx.gif',
  'https://imgur.com/w1TU5mR.gif',
  'https://i.imgur.com/sGVgr74.gif',
  'https://i.imgur.com/8LKPbOf.gif',
  'https://i.imgur.com/TItLfqh.gif',
  'https://i.imgur.com/YbNv10F.gif',
  'https://i.imgur.com/wQjUdnZ.gif',
  'https://i.imgur.com/e0ep0v3.gif',
  'https://i.imgur.com/OE7lSSY.gif',
  'https://i.imgur.com/YkrEkbF.gif',
  'https://i.imgur.com/mNEHfJ0.gif',
  'https://i.imgur.com/f86DzYb.gif',
  'https://i.imgur.com/qALwmUW.gif',
  'https://i.imgur.com/SvFRZyQ.gif',
  'https://i.imgur.com/l62EgFQ.gif',
  'https://i.imgur.com/ZzF0olN.gif',
  'https://i.imgur.com/3jzT5g6.gif',
  'https://i.imgur.com/B6UKulT.gif',
  'https://i.imgur.com/6i5zWCx.gif',
  'https://i.imgur.com/Uow8no2.gif',
];

var rand = list[Math.floor(Math.random() * list.length)];
var rand2 = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
const mentionUser= message.mentions.users.first()

if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para beijar!');
}

let avatar = message.author.displayAvatarURL({format: 'png'});
const embed = await message.channel.send(
  new Discord.MessageEmbed()
  .setColor('#ff6969')
  .setDescription(`${message.author} acaba de beijar ${mentionUser}`)
  .setImage(rand)
  .setFooter('Reaja com 💗 para retribuir.')
  .setAuthor(message.author.tag, avatar)
)
const emojis = ["💗"];

for (const i in emojis) {
  await embed.react(emojis[i])
}

const heartFilter = (reaction, user) => reaction.emoji.name === '💗' && user.id === mentionUser.id;
  heart = embed.createReactionCollector(heartFilter);

heart.on('collect', r2 => {
  const resposta = new Discord.MessageEmbed()
    .setColor('#ff6969')
    .setDescription(`${mentionUser} acaba de retribuir o beijo de ${message.author}`)
    .setImage(rand2)
    .setAuthor(mentionUser.tag, mentionUser.avatarURL())
  message.channel.send(resposta)
})
}
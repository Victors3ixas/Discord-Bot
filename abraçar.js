const Discord = require('discord.js');

exports.run = async (client, message, args) => {

var list = [
  'https://i.imgur.com/wihZ9gN.gif',
  'https://i.imgur.com/NAqXaOb.gif',
  'https://i.imgur.com/QofOyIA.gif',
  'https://i.imgur.com/gKUcC3l.gif',
  'https://i.imgur.com/r9aU2xv.gif',
  'https://i.imgur.com/wOmoeF8.gif',
  'https://i.imgur.com/nrdYNtL.gif',
  'https://i.imgur.com/BPLqSJC.gif',
  'https://i.imgur.com/ntqYLGl.gif',
  'https://i.imgur.com/v47M1S4.gif',
  'https://i.imgur.com/82xVqUg.gif',
  'https://i.imgur.com/4oLIrwj.gif',
  'https://i.imgur.com/6qYOUQF.gif',
  'https://i.imgur.com/UMm95sV.gif',
  'https://i.imgur.com/4ZmTqCd.gif',
  'https://i.imgur.com/i1FAt4t.gif',
  'https://i.imgur.com/v07ICwl.gif',
  'https://i.imgur.com/sZFpOxH.gif',
  'https://i.imgur.com/eIEKQpx.gif',
  'https://i.imgur.com/j3JsmPd.gif',
  'https://i.imgur.com/3m999hb.gif',
  'https://i.imgur.com/DUsaZ4c.gif',
  'https://i.imgur.com/HshiLQg.gif',
  'https://i.imgur.com/fyymfiZ.gif',
  'https://i.imgur.com/uxBbg6G.gif',
];

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
  .setColor('#f0f586')
  .setDescription(`${message.author} acaba de abraçar ${mentionUser}`)
  .setImage(rand)
  .setFooter('Reaja com 🥰 para retribuir.')
  .setAuthor(message.author.tag, avatar)
)
const emojis = ["🥰"];

for (const i in emojis) {
  await embed.react(emojis[i])
}

const heartFilter = (reaction, user) => reaction.emoji.name === '🥰' && user.id === mentionUser.id;
    heart = embed.createReactionCollector(heartFilter);

heart.on('collect', r2 => {
  const resposta = new Discord.MessageEmbed()
    .setColor('#f0f586')
    .setDescription(`${mentionUser} acaba de retribuir o abraço de ${message.author}`)
    .setImage(rand2)
    .setAuthor(mentionUser.tag, mentionUser.avatarURL())
  message.channel.send(resposta)
})
}
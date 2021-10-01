const Discord = require("discord.js");

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./dataBase/ConfigServer.json')
const db = low(adapter)

exports.run = async (client, message, args) => {
  message.delete();
  const content = args.join(" ");

  if (!args[0]) {
    return message.channel.send(`${message.author.username}, escreva a sugestão após o comando`)
  } else if (content.length > 1000) {
    return message.channel.send(`${message.author.username}, forneça uma sugestão de no máximo 1000 caracteres.`);
  } else {
    var canal = message.guild.channels.cache.find(ch => ch.id === db.get(message.guild.id).get("suggestChannel").value());
    const msg = await canal.send(
      new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor("#004d81")
        .addField("Sugestão:", content)
        .setFooter("ID do Autor: " + message.author.id)
        .setTimestamp()
    );
    await message.channel.send(`${message.author} a mensagem foi enviada com sucesso!`);

    const emojis = ["<:Positivo:834940215771529227>", "<:Negativo:834940216199610428>"]; //Emojis para reação

    for (const i in emojis) {
      await msg.react(emojis[i])
    }
  }
}
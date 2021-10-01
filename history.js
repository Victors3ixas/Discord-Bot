const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
message.delete();
await message.channel.send("<:Engrenagem:835318222349533215> **Comando em manuntenção...**")
}
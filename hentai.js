const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
message.delete();
await message.channel.send("😡 Vai se tratar, mano!! ")
}
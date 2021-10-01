const Discord = require("discord.js");

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./dataBase/ConfigServer.json')
const db = low(adapter)

exports.run = async (client, message, args) => {
    message.delete();

    const content = args.join(" ");

    if (!args[0] || Number(args[0]) == null || Number(args[0]) > 5) return message.channel.send(`${message.author.username}, Escreva quantas estrelas deseja ou digite um valor máximo de 5 estrelas.`)
    if (content.length > 1000) return message.channel.send(`${message.author.username}, forneça um FeedBack de no máximo 1000 caracteres.`);

    var canal = message.guild.channels.cache.find(ch => ch.id === db.get(message.guild.id).get("feedbackChannel").value());

    if (canal) {
        const msg = await canal.send(new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setColor("#004d81")
            .addField("Estrelas: ", args[0])
            .addField("Feedback:", args.slice(1).join(" "))
            .setFooter("ID do Autor: " + message.author.id)
            .setTimestamp()
        );

        const stars = {
            0: "<:1_estrela:851530940718383155> ",
            1: "<:2estrelas:851530959848341564>",
            2: "<:3_estrelas:851530983861780480>",
            3: "<:4_estrelas:851530992422617088>",
            4: "<:5_estrelas:851531013199757333>"
        };

        for (var i = 0; i < Number(args[0]); i++) {
            await msg.react(stars[i]);
        }

        await message.channel.send(`${message.author} a mensagem foi enviada com sucesso!`);
    }
    else {
        await message.channel.send(`${message.author}, nenhum canal de FeedBack foi selecionado.`)
    }
}
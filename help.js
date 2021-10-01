const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    message.delete();
    const helpMenssage = 
        `Está com dúvidas ou alguns problemas com meus comandos? Sem problemas, abaixo você encontra alguns links para te ajudar!!

        <:Shard:835629716563427368> **Links**
        **-** [Lista de Comandos](https://sites.google.com/view/lisarb/comandos)
        **-** [Servidor de Suporte](https://discord.gg/HMdBPKTGGv)
        **-** [Servidor de Comunidade](https://discord.gg/fexEYF9rtU)
        
        Utilize ` + "`//comandos` para recer um lista com todos os comandos na DM."

    const helpEmbed = new Discord.MessageEmbed()
        .setAuthor("Lisarb・Ajuda", client.user.avatarURL())
        .setColor("#004d81")
        .setDescription(helpMenssage)
        .setFooter(`Requisitado por: ${message.author.tag}`, message.author.avatarURL())

    message.channel.send(helpEmbed)

}

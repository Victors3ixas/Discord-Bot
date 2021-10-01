const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    message.delete();
    const Util_Commands =
        `**feedback <estrelas> <argumento>** - dá um feedback com estrelas ao servidor.
        **suggest <argumento>** - dá uma sugestão ao servidor.`

    const Config_Commands =
        `**feedback_channel <ID_Canal>** - seleciona um canal para receber os feedback's do servidor
        **suggest_channel <ID_Canal>** - seleciona um canal para receber as sugestões do servidor
        **punishment_channel <ID_Canal** - seleciona um canal de punições
        **mute_tag <ID_Role> - seleciona uma tag para mute`

    const Admin_Commands =
        `**ban <member>** - Bane o membro mencionado 
        **clear <n. mensagens>** - Deleta o numero de mensagens prescrito
        **mute <member>** - da uma tag de mutado para o o membro mencionado (configuração manual da tag)
        **kick <member>** - expulsa o membro mencionado`

    const Funny_Commands =
        `**abraçar <member>** - abraça o membro mencionado
        **slap <member>** - da uma tapa no membro mencionado
        **kiss <member>** - beija o membro mencionado
        **avatar [member]** - moostra o seu icon ou o do membro mencionado
        **coinflip** - simula um jogo de cara ou coroa
        **hentai** - descubra
        **say** - faz o bot enviar uma mensagem por você`

    const Info_Commands =
        `**ping** - Mostra algumas informarções de latência do bot
        **serverinfo** - Mostra algumas informações sobre o servidor`

    const helpEmbed = [
        new Discord.MessageEmbed()
            .setAuthor("Lisarb・Ajuda", client.user.avatarURL())
            .setColor("#004d81")
            .setDescription("Hmm, então você está precissando de uma lista com todos os meus comados, certo? Pois, listarei abaixo para você, Veja:")
            .addField("Configuração:", Config_Commands)
            .addField("Configuração:", Util_Commands)
            .addField("Configuração:", Admin_Commands)
            .addField("Configuração:", Funny_Commands)
            .addField("Configuração:", Info_Commands)
            .setFooter(`Requisitado por: ${message.author.tag}`, message.author.avatarURL())]

    message.channel.send(helpEmbed)

}

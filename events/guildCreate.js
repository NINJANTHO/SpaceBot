const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild) => {
    const data = await client.getGuild(guild);
    if(!data) await client.createGuild({ id: guild.id });

    const newGuildEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(`**Le serveur ${guild.name} vient de m'ajouter a son serveur, j'ai désormais ${client.guilds.cache.size} serveurs.** ( **${guild.memberCount} membres** )`)
        .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
    client.channels.cache.get(client.config.support.serveur).send(newGuildEmbed);
}
const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild) => {
    const newGuildEmbed = new MessageEmbed()
        .setColor('RED')
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))

        .setDescription(`**Le serveur ${guild.name} vient de m'expulser, je suis maintenant dans ${client.guilds.cache.size} serveurs.** ( **${guild.memberCount} membres** )`)

        .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
    client.channels.cache.get(client.config.support.serveur).send(newGuildEmbed);
}

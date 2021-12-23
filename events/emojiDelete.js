const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = async (client, emoji) => {
    const data = await client.getGuild(emoji.guild);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            if(!emoji.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            const fetchGuildAuditLogs = await emoji.guild.fetchAuditLogs({
                limit: 1,
                type: 'EMOJI_DELETE'
            })

            const embed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`<:mys_yes:817864507334328420> **${executor.username} vient de supprimer un emoji.**`, executor.displayAvatarURL({ dynamic: true }))
                .addField('`Nom`', emoji.name, true)
                .addField('`Animé`', emoji.animated ? "Oui" : "Non", true)
                .setFooter('ID: ' + emoji.id)
                .setTimestamp();
            emoji.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}
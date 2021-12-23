const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild, user) => {
    const data = await client.getGuild(guild);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            if(!guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            const fetchGuildAuditLogs = await guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_BAN_REMOVE'
            })

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`<:mys_yes:817864507334328420> **${user.username} vient de se faire unban par ${fetchGuildAuditLogs.entries.first().executor}.**`, executor.displayAvatarURL({ dynamic: true }))
                .setFooter('ID: ' + user.id)
                .setTimestamp();
            guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}
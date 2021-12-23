const { MessageEmbed } = require("discord.js");

module.exports = async (client, emoji) => {
    const data = await client.getGuild(emoji.guild);

    if(data.plugins.logs.enabled) {
        if(data.plugins.logs.channel) {
            if(!emoji.guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
            const fetchGuildAuditLogs = await emoji.guild.fetchAuditLogs({
                limit: 1,
                type: 'EMOJI_CREATE'
            })

            const embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`<:config:820696015102410802> **${executor.username} vient de créer un emoji.**`, executor.displayAvatarURL({ dynamic: true }))
                .addField('`Name`', emoji.name, true)
                .addField('`Animated`', emoji.animated ? "Yes" : "No", true)
                .addField('`Link`', emoji.url)
                .setFooter('ID: ' + emoji.id)
                .setTimestamp();
            emoji.guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}
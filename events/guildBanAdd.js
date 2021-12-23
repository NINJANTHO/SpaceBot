const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild, user) => {
    const data = await client.getGuild(guild);
    if(!data) return;

    if(!guild.me.hasPermission("VIEW_AUDIT_LOG")) return;
    const fetchGuildAuditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD'
    })

    const { executor } = fetchGuildAuditLogs.entries.first();

    if(data.plugins.protection.antiban) {
        if((guild.ownerID === executor.id) || executor.bot || user.bot) return;

        await client.updateGuild(guild, { lastBanExecutor: executor.id });        

        if(executor.id === data.lastBanExecutor) {
            if((Date.now() - data.lastBanTimestamp) < 10000) {
                await guild.member(executor).ban({ reason: "Anti Ban" }).catch(() => {});
            }

            await client.updateGuild(guild, { lastBanTimestamp: Date.now() });
        } else {
            await client.updateGuild(guild, { lastBanExecutor: executor.id });
        }
    }

    if(data.plugins.logs.enabled) {
        if(guild.channels.cache.get(data.plugins.logs.channel)) {
            const embed = new MessageEmbed()
                .setColor('DARK_RED')
                .setDescription(`<:mys_yes:817864507334328420> **${user.username} vient de se faire ban par ${uxecutor}.**`, executor.displayAvatarURL({ dynamic: true }))
                .setFooter('ID: ' + user.id)
                .setTimestamp();
            guild.channels.cache.get(data.plugins.logs.channel).send(embed);
        }
    }
}

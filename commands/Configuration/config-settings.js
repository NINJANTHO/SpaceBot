module.exports.run = (client, message, args, data) => {
    message.channel.send({ 
        embed: {
            color: client.config.embed.color,
            author: {
                icon_url: message.guild.iconURL({ dynamic: true }),
                name: message.guild.name
            },
            description: `**Configuration actuelle du serveur ${message.guild.name}** \nSi vous souhaitez activer ou désactiver certaines plugins, faites \`${data.prefix}enable <plugin>\`. Pour plus d'informations, faites \`${data.prefix}help\``,
            fields: [
                {
                    name: "Informations Général",
                    value: `Préfix actuel: \`${data.prefix}\` \nLangue: \`${data.lang}\``,
                    inline: false
                },
                {
                    name: "Message de bienvenue",
                    value: `Activé: \`${data.plugins.welcome.enabled ? "Oui" : "Non"}\` \nMessage: \`${data.plugins.welcome.message}\` \nSalon: ${data.plugins.welcome.channel ? checkDeleted("welcome") : "`MP`"}`,
                    inline: true
                },
                {
                    name: "Message d\'aurevoir",
                    value: `Activé: \`${data.plugins.goodbye.enabled ? "Oui" : "Non"}\` \nMessage: \`${data.plugins.goodbye.message}\` \nSalon: ${data.plugins.goodbye.channel ? checkDeleted("goodbye") : "`MP`"}`,
                    inline: false
                },
                {
                    name: "Protection",
                    value: `AntiJoin: \`${data.plugins.protection.raidmode ? "Activé" : "Désactivé"}\` \nAnti-role: \`${data.plugins.protection.antigiverole ? "Activé" : "Désactivé"}\` \nAntilien: \`${data.plugins.protection.antilink ? "Activé" : "Désactivé"}\` \nAntimaj: \`${data.plugins.protection.antimaj ? "Activé" : "Désactivé"}\` \n**Antispam**: \nActivé: \`${data.plugins.protection.antispam?.enabled ? "Activé" : "Désactivé"}\` \nSalon(s) ignoré(s): ${data.plugins.protection.antispam?.ignored_channels?.length >= 1 ? data.plugins.protection.antispam.ignored_channels.map(c => `<#${c}>`).join(", ") : "`Aucun`"}`,
                    inline: true
                },
                {
                    name: "\u200b",
                    value: "\u200b",
                    inline: true
                }
            ],
            footer: {
                icon_url: client.user.displayAvatarURL(),
                text: client.config.embed.footer
            }
        } 
    });

    function checkDeleted(plugin) {
        const channel = client.channels.cache.get(data.plugins[plugin].channel);
        if(!channel) return "**Salon supprimé**";
        else return `<#${channel.id}>`;
    }
}

module.exports.help = {
    name: "config",
    aliases: ["config"],
    category: 'Config',
    description: "Vérifier les paramètres de configuration du serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: ["EMBED_LINKS"],
    args: false
}
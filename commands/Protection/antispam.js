module.exports.run = async (client, message, args, data) => {
    if(!data.plugins.protection.antispam?.enabled) {
        data.plugins.protection.antispam = {
            enabled: true,
            ignored_channels: data.plugins.protection.antispam ? data.plugins.protection.antispam.ignored_channels : []
        };

        data.markModified("plugins.protection");
        data.save();

        message.channel.send(`<:information:820697291911987211> **Le plugin est désormais activer**`);
    } else if(data.plugins.protection.antispam.enabled === true) {
        data.plugins.protection.antispam = {
            enabled: false,
            ignored_channels: data.plugins.protection.antispam.ignored_channels
        };

        data.markModified("plugins.protection");
        data.save();

        message.channel.send(`<:information:820697291911987211> **Le plugin est désormais désactiver**`);
    }
}

module.exports.help = {
    name: "antispam",
    aliases: ["antispam", "anti-spam"],
    category: 'Protection',
    description: "Activer/Désactiver l'anti spam sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["MANAGE_MESSAGES"],
    botPerms: ["MANAGE_MESSAGES"],
    args: false
}
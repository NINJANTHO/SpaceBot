module.exports.run = async (client, message, args, data) => {
    let plugin = args[0];

    switch (plugin?.toLowerCase()) {
        case "protection": {
            message.channel.send('<:no:820700530824577024> **Attention, ce plugin n\'est pas activable**');
            break;
        }
        case "welcome": {
            if(!data.plugins.welcome.enabled) {
                data.plugins.welcome.enabled = true;

                data.markModified("plugins.welcome.enabled");
                data.save();

                message.channel.send(`<:information:820697291911987211> **Le plugin est désormais activer**`);
            } else {
                message.channel.send('<:no:820700530824577024> **Ce plugin est déjà activer**');
            }

            break;
        };
        case "autorole": {
            if(!data.plugins.autorole.enabled) {
                data.plugins.autorole.enabled = true;

                data.markModified("plugins.autorole.enabled");
                data.save();

                message.channel.send(`<:information:820697291911987211> **Le plugin est désormais activer**`);
            } else {
                message.channel.send('<:no:820700530824577024> **Ce plugin est déjà activer**');
            }

            break;
        };
        case "goodbye": {
            if(!data.plugins.goodbye.enabled) {
                data.plugins.goodbye.enabled = true;

                data.markModified("plugins.goodbye.enabled");
                data.save();

                message.channel.send(`<:information:820697291911987211> **Le plugin est désormais activer**`);
            } else {
                message.channel.send('<:no:820700530824577024> **Ce plugin est déjà activer**');
            }

            break;
        };



       
        default: {
            message.channel.send('<:yes:820700480988512376> **Attention ce plugin n\'existe pas**');
        }
    }
}

module.exports.help = {
    name: "enable",
    aliases: ["enable", "enable-plugin", "enableplugins", "enable-plugins", "enableplugin"],
    category: 'Config',
    description: "Activer certains plugins",
    usage: "<plugin>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: [],
    args: false
}
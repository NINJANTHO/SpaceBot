module.exports.run = async (client, message, args, data) => {
    let plugin = args[0];

    switch (plugin?.toLowerCase()) {
        case "protection": {
            message.channel.send('<:no:820700530824577024> **Attention, ce plugin n\'est pas désactivable**');
            break;
        }
        case "welcome": {
            if(data.plugins.welcome.enabled) {
                data.plugins.welcome.enabled = false;

                data.markModified("plugins.welcome.enabled");
                data.save();

                message.channel.send(`<:information:820697291911987211> **Le plugin est désormais désactiver**`);
            } else {
                message.channel.send('<:no:820700530824577024> **Ce plugin est déjà désactiver**');
            }
            break;
        }
        case "autorole": {
            if(data.plugins.autorole.enabled) {
                data.plugins.autorole.enabled = false;

                data.markModified("plugins.autorole.enabled");
                data.save();

                message.channel.send(`<:information:820697291911987211> **Le plugin est désormais désactiver**`);
            } else {
                message.channel.send('<:no:820700530824577024> **Ce plugin est déjà désactiver**');
            }

            break;
        }
        case "goodbye": {
            if(data.plugins.goodbye.enabled) {
                data.plugins.goodbye.enabled = false;

                data.markModified("plugins.goodbye.enabled");
                data.save();

                message.channel.send(`<:information:820697291911987211> **Le plugin est désormais désactiver**`);
            } else {
                message.channel.send('<:no:820700530824577024> **Ce plugin est déjà désactiver**');
            }

            break;
        }
       
        default: {
            message.channel.send('<:yes:820700480988512376> **Attention ce plugin n\'existe pas**');
        }
    }
}

module.exports.help = {
    name: "disable",
    aliases: ["disable", "disable-plugin", "disableplugins", "disable-plugins", "disableplugin"],
    category: 'Config',
    description: "Désactiver certains plugins",
    usage: "<plugin>",
    cooldown: 5,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: [],
    args: false
}
module.exports.run = async (client, message, args, data) => {
    if(data.plugins.protection.raidmode === false) {
        data.plugins.protection.raidmode = true;

        data.markModified("plugins.protection.raidmode");
        data.save();

        message.channel.send(`<:information:820697291911987211> **Le plugin est désormais activer**`);
    } else if(data.plugins.protection.raidmode === true) {
        data.plugins.protection.raidmode = false;

        data.markModified("plugins.protection.raidmode");
        data.save();

        message.channel.send(`<:information:820697291911987211> **Le plugin est désormais désactiver**`);
    }
}

module.exports.help = {
    name: "antijoin",
    aliases: ["raidmode", "raidmod"],
    category: 'Protection',
    description: "Activer/Désactiver le mode raid sur le serveur",
    usage: "",
    cooldown: 5,
    memberPerms: ["KICK_MEMBERS"],
    botPerms: ["KICK_MEMBERS"],
    args: false
}
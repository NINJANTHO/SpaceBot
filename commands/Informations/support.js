const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setColor('#2ECE49')
        .setDescription(`**<:etoile:831214448794402859> Vous voulezs [rejoindre](https://discord.gg/M2FVmBBnbfa) le serveur support?**`)

        
    message.channel.send(embed);
}

module.exports.help = {
    name: "support",
    aliases: ["support"],
    category: "General",
    description: "Envoie un lien pour inviter le bot sur son serveur !",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}
const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setColor('#2ECE49')
        .setDescription(`**<:etoile:831214448794402859> Voici toute mes [commandes](https://discord.com/api/oauth2/authorize?client_id=820220212372701185&permissions=8&scope=bot) disponible**`)

        .addField(`<:information:820697291911987211>・Informations`, "``` invite,  support, help, ping, avatar, sondage\```")

        .addField(`<a:giveaway:821451844001726504>・Giveaway`, "``` end,  start, reroll\```")

        .addField(`<:modo:821417956130553876>・Modération`, "``` ban,  kick, nuke\```")

        .addField(`<:config:820696015102410802>・Configuration`, "``` set-prefix,  enable, disable, welcome, goodbye, autorole  suggestion-channel, private-channels, clear-data, config\```")

        .addField(`<:admin:820695835012104233>・Protection`, "``` antilien,  antijoin, antispam, antimaj, antirole, ignore-channel\```")
    message.channel.send(embed);
}

module.exports.help = {
    name: "help",
    aliases: ["h"],
    category: "General",
    description: "Envoie un lien pour inviter le bot sur son serveur !",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}
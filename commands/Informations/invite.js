const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message) => {
    const embed = new MessageEmbed()
        .setColor('#2ECE49')
        .setDescription(`**<:etoile:831214448794402859> Vous voulez [inviter](https://discord.com/api/oauth2/authorize?client_id=820220212372701185&permissions=8&scope=bot) le bot a votre serveur?**`)

        
    message.channel.send(embed);
}

module.exports.help = {
    name: "invite",
    aliases: ["invite"],
    category: "General",
    description: "Envoie un lien pour inviter le bot sur son serveur !",
    usage: "",
    cooldown: 5,
    memberPerms: [],
    botPerms: ["EMBED_LINKS"],
    args: false
}
const emojis = require('../../emojis');

module.exports.run = async (client, message, args, data) => {
	let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));

    if(!user || !message.guild.member(user)) return message.channel.send('<:information:820697291911987211> **Attention, cet utilisateur n\'existe pas**');

    if(user.id == message.author.id) return message.channel.send(`<:information:820697291911987211> **Attention, vous ne pouvez pas vous bannir vous même**`);

    if(user.id == client.user.id) return message.channel.send(`Eh bah nan mec`);

    const reason = (args.slice(1).join(" ") || "Pas de raison spécifiée");

    const member = message.guild.member(user);

    const memberPosition = member.roles.highest.position;
    const moderatorPosition = message.guild.member(message.author).roles.highest.position;
    if(message.guild.ownerID !== message.author.id) {
        if(moderatorPosition <= memberPosition) return message.channel.send(`<:information:820697291911987211> **Attention, vous ne pouvez pas bannir ce membre.**`);   
    }

    if(!member.bannable) return message.channel.send(`<:information:820697291911987211> **Attention, je n'ai pas les permissions suffisantes pour bannir ce membre, vérifiez que mon rôle est au dessus du membre à bannir, et réessayez.**`);

    message.guild.member(user).ban({ reason: reason }).then(() => {
        user.send(`Vous avez été banni du serveur ${message.guild.name} par ${message.author}. Raison: **${reason}**`);
        message.channel.send(`${user} s'est fait bannir par ${message.author} pour la raison suivante: **${reason}**`);
    }).catch(err => {
        console.log(err);
        message.channel.send(`Une erreur est survenue, veuillez réessayer. \n\`\`\`js\n${err}\n\`\`\``);
    });
}

module.exports.help = {
    name: "ban",
    aliases: ["ban"],
    category: "Moderation",
    description: "Bannir un membre",
    usage: "<membre> [raison]",
    cooldown: 5,
    memberPerms: ["BAN_MEMBERS"],
    botPerms: ["BAN_MEMBERS"],
    args: true
}
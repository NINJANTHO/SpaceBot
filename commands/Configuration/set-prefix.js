module.exports.run = async (client, message, args, data) => {
    let prefix = args[0];
    if(!prefix) return message.channel.send(`<:no:820700530824577024> **Veuillez spécifiez le nouveau préfix`);

    if(prefix == data.prefix) return message.channel.send('<:no:820700530824577024> **Attention, ce préfixe est le même que l\'actuel**');

    if(prefix.length > 3) return message.channel.send('<:no:820700530824577024> **Attention, le préfix ne peut pas faire plus de 3 caractères**');

    await client.updateGuild(message.guild, { prefix: prefix });
    message.channel.send(`<:information:820697291911987211>  **Mon préfix est désormais \`${prefix}\`**`);
}

module.exports.help = {
    name: "setprefix",
    aliases: ["setprefix", "set-prefix", "prefix"],
    category: 'Config',
    description: "Changer le préfixe du bot dans le serveur (max. 3 caractères)",
    usage: "<nouveau préfixe>",
    cooldown: 10,
    memberPerms: ["MANAGE_GUILD"],
    botPerms: [],
    args: false
}
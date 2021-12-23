const Discord = require('discord.js');
const Guild = require('../models/Guild');

module.exports = async (client, message) => {
    if(message.channel.type === "dm" || message.author.bot) return;

    if(!message.member) await message.guild.fetchMember(message.author);

    if(message.content.includes(client.token)) {
        return message.delete().then(() => client.users.cache.get(client.config.owner.id).send("Tu devrais regen ton token. C'est juste un conseil."));
    }

    const data = await client.getGuild(message.guild);
    if(!data) {
        client.emit("guildCreate", message.guild);

        const welcomeEmbed = new Discord.MessageEmbed()
            .setColor(client.config.embed.color)
            .setTitle('Merci de m\'ajouter a votre serveur.')
            .setFooter(client.config.embed.footer, client.user.displayAvatarURL())
        return message.channel.send(welcomeEmbed).catch(() => {});
    }

    const p = data.members.map(m => m.id).indexOf(message.member.id);
    const userData = data.members[p];

    if(message.guild && p == -1) {
        Guild.updateOne({
            id: message.guild.id
        },
        { 
            $push: {
                members: {
                    id: message.member.id,
                    exp: 0,
                    level: 0
                }
            }
        }).then(() => {});
    }

    const prefixes = [`<@!${client.user.id}> `, `<@${client.user.id}> `, data.prefix]
    let prefix = null;
    prefixes.forEach(p => {
        if(message.content.startsWith(p)) {
            prefix = p;
        }
    })

    if(message.guild.me.permissionsIn(message.channel).has('SEND_MESSAGES')) {
        if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
            message.channel.send(`**Mon préfix sur ce serveur est \`${data.prefix}\`**`);
        }
    }

    if(data.plugins.protection.antilink) {
        if(/discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i.test(message.content)) {
            if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
                return message.delete().then(() => {
                    if(data.plugins.logs.enabled && data.plugins.logs.channel) {
                        let embed = {
                            color: 'RED',
                            author: {
                                name: message.author.username,
                                icon_url: message.author.displayAvatarURL({ dynamic: true })
                            },
                            description: `${message.author} a envoyé une pub dans ${message.channel}!`,
                            fields: [
                                {
                                    name: "Original message",
                                    value: message.content
                                }
                            ],
                            footer: {
                                text: client.config.embed.footer,
                                icon_url: client.user.displayAvatarURL()
                            }
                        }

                        if(embed.fields[0].value.length > 1000) {
                            embed.fields[0].value = message.content.slice(0, 1000) + "...";
                        }

                        message.guild.channels.cache.get(data.plugins.logs.channel).send({ embed: embed });
                    }
                })
            }
        }
    }

    if(!message.content.startsWith(prefix) || message.webhookID) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if(!command) return;
    
    if(!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES") || !message.guild.me.permissionsIn(message.channel).has("READ_MESSAGE_HISTORY")) return message.author.send(`${message.author}, I don't have the permissions to talk or see the message history in the lounge ${message.channel} !`).catch(() => {});

    if(command.help.botPerms.length > 0) {
        if(!message.guild.me.permissionsIn(message.channel).has(command.help.botPerms)) {
            return message.channel.send(`**Je n'ai pas la permission requise**`)
        }
    }

    if(command.help.memberPerms.length > 0) {
        if(!message.member.permissionsIn(message.channel).has(command.help.memberPerms)) {
            return message.channel.send(`**Vous n'avez pas la permission requise**`);
        }
    }

    if(command.help.args && !args.length) {
        return message.channel.send({
            embed: {
                color: "#FF0000",
                author: {
                    name: message.author.username,
                    icon_url: message.author.displayAvatarURL({ dynamic: true })
                },
                description: `**Vous n'avez pas utiliser la commande correctement**`,
                footer: {
                    text: client.config.embed.footer,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        })
    }

    if(!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Discord.Collection());
    }

    const tStamps = client.cooldowns.get(command.help.name);
    const cdAdmount = (command.help.cooldown || 0) * 1000;

    if(tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAdmount;

        if(Date.now() < cdExpirationTime) {
            timeLeft = (cdExpirationTime - Date.now()) / 1000;
            return message.channel.send(`**Veuilez attendre ${timeLeft.toFixed(0)}s pour utiliser cette commande.**`)
            .then(async msg => {
                await msg.delete({ timeout: 5000 });
            }).catch(() => {});
        }
    }

    tStamps.set(message.author.id, Date.now());
    setTimeout(() => tStamps.delete(message.author.id), cdAdmount);

    try {
        command.run(client, message, args, data, userData);  
    } catch (error) {
        console.log(error.message);
        message.channel.send(`An error occurred during the execution of the order. \n\`\`\`js\n${error.message}\n\`\`\``);
        client.channels.cache.get(client.config.support.logs).send(`Une erreur est survenue lors de la commande ${commandName}: \n\`\`\`js\n${error.message}\n\`\`\``);
    }
}

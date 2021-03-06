const { MessageCollector } = require("discord.js");

module.exports.run = async (client, message) => {
    message.channel.send('<:information:820697291911987211> **Attention, êtes vous sur de vouloir remettre à 0 la configuration du serveur?\nRépondez par oui ou par non.**');

    const filter = m => m.author.id === message.author.id

    const c = new MessageCollector(message.channel, filter, {
        time: 30000,
        max: 1
    })

    c.on("collect", async msg => {
        if(msg.content.toLowerCase() === "oui") {
            c.stop(true);

            await client.updateGuild(message.guild, {
                plugins: {
                    protection: {
                        raidmode: false,
                        antigiverole: false,
                        antiban: false,
                        antilink: false,
                        antimaj: false,
                        antispam: {
                            enabled: false,
                            ignored_channels: []
                        }
                    },
                    welcome: {
                        enabled: false,
                        message: client.config.defaultsSettings.welcomeMessage,
                        channel: null
                    },
                    goodbye: {
                        enabled: false,
                        message: client.config.defaultsSettings.goodbyeMessage,
                        channel: null
                    },
                    logs: {
                        enabled: false,
                        channel: null
                    },
                    autorole: {
                        enabled: false,
                        role: null
                    },
                    suggestion: {
                        enabled: false,
                        channel: null
                    },
                    economy: {
                        enabled: true,
                        currency: "$"
                    },
                    levels: {
                        enabled: true,
                        level_up_channel: null,
                        roles_rewards: []
                    }
                },
                muterole: null
            });
        
            message.channel.send('✅ La configuration a bien été reset.');
        } else {
            c.stop(true);
            message.channel.send('Commande annulée');
        }
    });

    c.on("end", (_collected, reason) => {
        if(reason === "time") return message.channel.send('Temps écoulé');
    });
}

module.exports.help = {
    name: "reset-config",
    aliases: ["reset-config", "resetconfig","clear-data"],
    category: 'Config',
    description: "Remettre la configuration du serveur à 0",
    usage: "",
    cooldown: 5,
    memberPerms: ["ADMINISTRATOR"],
    botPerms: ["EMBED_LINKS"],
    args: false
}
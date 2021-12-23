module.exports.run = (client, message, args, data) => {
    let messageID = args[0]
    if(!messageID || isNaN(parseInt(messageID)) || messageID.length != 18) return message.channel.send('Veuillez spécifier l\'id d\'un giveaway a relancer. \nPour récupérer l\'id, faites clic droit sur le giveaway -> Copier l\'identifiant. Si cette option n\'apparraît pas, allez dans vos Paramètres utilisateurs -> Apparence -> Mode développeur.');

    client.giveawaysManager.reroll(messageID, {
        congrat: 'Félicitations, le(s) nouveau(x) gagnant(s) sont: {winners}!',
        error: 'Aucun gagnant valide n\'a pu être choisi.'
    }).catch(() => message.channel.send('Aucun giveaway trouvé avec comme id ' + messageID + '.'));
}

module.exports.help = {
    name: "reroll",
    aliases: ["reroll"],
    category: "Giveaways",
    description: "Changer de gagnant sur un giveaway",
    usage: "<id du giveaway>",
    cooldown: 5,
    memberPerms: ["MANAGE_MESSAGES"],
    botPerms: [],
    args: true
}
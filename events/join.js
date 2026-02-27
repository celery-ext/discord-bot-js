module.exports = (client) => {
    const { GuildManager } = require('../core/guild');
    const { Events } = require('discord.js');
    client.on(Events.GuildCreate, (c) => {
        GuildManager.SetGuildData(c);
        console.log(`${c}に参加しました`);
    });
};


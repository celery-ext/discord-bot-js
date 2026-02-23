module.exports = (client) => {
    const { Events } = require('discord.js');
    client.on(Events.GuildCreate, (c) => {
        console.log(`${c}に参加しました`);
    });
};


module.exports = (client) => {
    const { Events } = require('discord.js');
    client.once(Events.ClientReady, (c) => {
        console.log(`準備OKです! ${c.user.tag}がログインします。`);
    });
};
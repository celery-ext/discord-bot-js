module.exports = (client) => {
    const { Events } = require('discord.js');
    client.on(Events.GuildCreate, (c) => {
        joinnewguild(c.id);
        console.log(`${c}に参加しました`);
    });
};

const fs = require('fs');
const path =  require('path');

function joinnewguild(guildid) {
    const serverdata = require('../core/data.json');
    let obj = {
        "commandconfig": false,
        "commands": [
            "introduction"
        ]
    }
    serverdata[guildid] = obj;

    fs.writeFileSync(
        path.resolve('./core', 'data.json'), 
        JSON.stringify(serverdata, null, '  '), 
        'utf-8'
    );
}
const fs = require('fs');
const path =  require('path');
const { Commandregister } = require('../core/commandload');

function registcommandsforguild(guildid){
    new Commandregister(guildid);
}

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
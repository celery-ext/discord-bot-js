const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');
const command = require('../events/command');
const { Commands } = require('./commandload');

class GuildManager{
    static GetGuildData(){
        const guildList = this.client.guilds.cache.map(guild => ({
            name: guild.name,
            id: guild.id
        }));
        for(guild of guildList){
            console.log(guild);
            let obj = new GuildData(duild);
        }
        console.log(guildList);
    }

    static SetGuildData(guild){
        const serverdata = JSON.parse(
            fs.readFileSync(
                path.join(__dirname,'./data/data.json'),
                'utf-8')
        );
        
        serverdata[guild.id] = new GuildData(guild).obj;

        fs.writeFileSync(
            path.resolve(__dirname,'./data','data.json'),
            JSON.stringify(serverdata, null, '  '),
            'utf-8'
        );
    }

    static FormatGuildData(guildlist){
        const serverdata = {};
        for(let guild of guildlist){
            serverdata[guild.id] = new GuildData(guild).obj;
        }
        fs.writeFileSync(
            path.resolve(__dirname,'./data','data.json'),
            JSON.stringify(serverdata, null, '  '),
            'utf-8'
        );
    }
}

class GuildData{
    constructor(guild){
        this.obj = {
            "id": guild.id,
            "name": guild.name,
            "commandconfig": false,
            "registcommand": this.getCommandSet()
        };
    }

    getCommandSet(){
        const CommandSet = {};
        const commands = new Commands('../commands');
        const RegistCommands = commands.getRegistCommands();
        for(let command of RegistCommands){
            CommandSet[String(command.name)] = false;
        }
        CommandSet["introduction"] = true
        return CommandSet;
    }
}

module.exports = {GuildManager,GuildData}

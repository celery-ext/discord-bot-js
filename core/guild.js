const fs = require('fs');
const path = require('path');
const { Commands, CommandManager } = require('./command');

class GuildManager{
    static GetGuildData(client){
        return client.guilds.cache.map(guild => ({
            name: guild.name,
            id: guild.id
        }));
    }

    static SetGuildData(guild){
        const serverdata = JSON.parse(fs.readFileSync(path.join(__dirname,'./data/data.json'),'utf-8'));

        const guildobj = new GuildData(guild);
        serverdata[guild.id] = guildobj.guilddata();

        fs.writeFileSync(path.resolve(__dirname,'./data','data.json'),JSON.stringify(serverdata, null, '  '),'utf-8');
    }

    static FormatGuildData(guildlist){
        const serverdata = {};
        
        for(let guild of guildlist){
            const guildobj = new GuildData(guild);
            serverdata[guild.id] = guildobj.guilddata();
        }

        fs.writeFileSync(path.resolve(__dirname,'./data','data.json'),JSON.stringify(serverdata, null, '  '),'utf-8');
    }
}

class GuildData{
    #obj
    constructor(guild){
        this.#obj = this.#criateobj(guild);
    }

    guilddata(){
        return this.#obj
    }

    #criateobj(guild){
        return {
            id: guild.id,
            name: guild.name,
            commandconfig: false,
            registcommand: this.#getCommandSet()
        };
    }

    #getCommandSet(){
        const commandSet = [];
        const commands = new CommandManager();
        const RegistCommands = commands.getRegistCommands();
        for(let command of RegistCommands){
            let commandDic = {};
            commandDic["name"] = String(command.name);
            if(command.name == "introduction"){
                commandDic["enabled"] = true;
            }
            else{
                commandDic["enabled"] = false;
            }
            commandSet.push(commandDic);
        }
        return commandSet;
    }
}

module.exports = {GuildManager,GuildData}
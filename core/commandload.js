const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

class Command {
    constructor(item){
        this.commandName = item.data.name;
        this.enable = true;
        this.command = item;
    }
}

class Commands {
    #readCommands
    #registCommands
    #loadCommands

    constructor(directorypath) {
        
        const commandsDir = path.resolve(__dirname, directorypath); // 絶対パス化
        const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));
        this.#readCommands = this.builtreadcommands(commandsDir, commandFiles);
        this.#registCommands = this.builtregistcommands(this.#readCommands);    //サーバー登録用
        this.#loadCommands = this.builtloadcommands(this.#readCommands);    //bot登録用

    }

    builtreadcommands(commandsDir, commandFiles){
        const commands = [];
        for (const file of commandFiles) {
            const command = require(path.join(commandsDir, file));
            if(!this.checkfiledata(command,file)) continue;
            commands.push(command);
        }
        return commands
    }

    builtregistcommands(commands){
        return commands.map(command => command.data.toJSON())
    }

    builtloadcommands(commands){
	    const commandarray = new Map();
        for (const command of commands) {
		    commandarray.set(command.data.name, command);
        }
        this.loadcommandslog(commandarray);
        return commandarray
    }

    checkfiledata(command,file){
        if (!command || !command.data || !command.execute) {
			console.warn(`[警告] ${file} は正しい形式ではありません。スキップします。`);
			return false;
		}
        return true
    }

    loadcommandslog(commands){
        console.log('読み込んだコマンド:');
	    for (const [name, cmd] of commands) {
		    console.log(`- ${name}`);
        }
    }

    getRegistCommands() {
        return this.#registCommands;    //サーバー登録用
    }
    getloadCommands() {
        return this.#loadCommands;      //bot登録用
    }
}

async function registercommands(client, commands, guildId){
    try{
        const rest = new REST({ version: '10' }).setToken(client.token);
        await rest.put(
            Routes.applicationGuildCommands(client.applicationId, guildId),
            { body: commands },
        );
        console.log('コマンドの登録に成功しました。');
    }catch(error){
        console.error('コマンドの登録に失敗しました。', error);
    }

}
const fs = require('fs');
const path = require('path');
const { REST, Routes, Guild } = require('discord.js');
const { Token, ApplicationId } = require('./config');

class CommandsBuilder{
    #readCommands
    #registCommands
    #loadCommands
    #commandspath
    constructor(defaultmode = false) {
        if(defaultmode) this.#commandspath = '../commands/serverdefault';
        if(!defaultmode) this.#commandspath = '../commands';
        const commandsDir = path.resolve(__dirname, this.#commandspath); // 絶対パス化
        const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));
        this.#readCommands = this.#buildreadcommands(commandsDir, commandFiles);
        this.#registCommands = this.#createregistcommands(this.#readCommands)
        this.#loadCommands = this.#createloadcommands(this.#readCommands)
    }

    #buildreadcommands(commandsDir, commandFiles) {
        const commands = [];
        for (const file of commandFiles) {
            const command = require(path.join(commandsDir, file));
            if (!this.#checkformat(command, file)) continue;
            commands.push(command);
        }
        return commands
    }
    
    #checkformat(command, file) {
        if (!command || !command.data || !command.execute) {
            console.warn(`[警告] ${file} は正しい形式ではありません。スキップします。`);
            return false;
        }
        return true
    }

    getRegistCommands() {
        return this.#registCommands;    //サーバー登録用
    }
    getLoadCommands() {
        return this.#loadCommands;      //bot登録用
    }
    
    #createregistcommands(commands){
        return commands.map(command => command.data.toJSON());
    }

    #createloadcommands(commands){
        const commandarray = new Map();
        for (const command of commands) {
            commandarray.set(command.data.name, command);
        }
        this.#loadcommandslog(commandarray);
        return commandarray    //bot登録用   
    }

    #loadcommandslog(commands) {
        console.log('読み込んだコマンド:');
        for (const [name, cmd] of commands) {
            console.log(`- ${name}`);
        }
    }
}

class Commandregister {
    #guildid
    #token
    #applicationid
    constructor(Guildid) {
        this.#guildid = Guildid;
        this.#token = Token;
        this.#applicationid = ApplicationId;
        this.#createcommands();
    }

    #createcommands(){
        return this.#registercommands(this.#commandsfilltering());
    }
    
    #commandsfilltering() {
        const allcommands = new CommandsBuilder().getRegistCommands();    //受け取ってるのはjson
        const serverdata = JSON.parse(fs.readFileSync(path.join(__dirname,'./data/data.json'),'utf-8'));

        if (!serverdata[this.#guildid]||serverdata[this.#guildid].commandconfig == false)
            return new CommandsBuilder(true).getRegistCommands();

        //これ以降サーバーデータのコマンドのtrue or falseを検証するコードを書く必要ある
        const serverconfig = serverdata[this.#guildid].registcommands;
        const setcommands = []; 
        for(const cmd of allcommands){
            if(serverconfig.includes(cmd.name)){
                setcommands.push(cmd);
            }
        }
        
        if(setcommands.length === 0) 
            return new CommandsBuilder(true).getRegistCommands();

        return setcommands;
    }

    async #registercommands(commands) {
        try {
            await this.#resetregistcommands();
            await this.#registcommands(commands);
            console.log('コマンドの登録に成功しました。');
        } catch (error) {
            console.error('コマンドの登録に失敗しました。', error);
        }
    }

    async #registcommands(commands){
        const rest = new REST({ version: '10' }).setToken(this.#token);
        await rest.put(
            Routes.applicationGuildCommands(this.#applicationid, this.#guildid),
            { body: commands },
        );
    }

    async #resetregistcommands(){
        await this.#registcommands([]);
    }
}

module.exports = { CommandsBuilder, Commandregister};
class Command{
    constructor(item){
        this.commandName = item.data.name;
        this.enable = true;
        this.command = item;
    }
}

const fs = require('fs');
const path = require('path');

function loadCommands(directorypath){
    const commandsDir = path.resolve(__dirname, directorypath); // 絶対パス化
	const commands = new Map();
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const item = require(path.join(commandsDir, file));
        if (!item || !item.data || !item.execute) {
			console.warn(`[警告] ${file} は正しい形式ではありません。スキップします。`);
			continue;
		}

        const command = new Command(item);
        commands.set(command.commandName, command);
    }
    return commands;
}
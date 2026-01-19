const { Commands,Commandregister  } = require('../core/commandload');
const command = new Commands('../commands');
const serverdata = require('../core/data.json');

function registallguildcommands(){
    for (const guildId of Object.keys(serverdata)) {
        new Commandregister(guildId);
    }
}

registallguildcommands();


module.exports = (client) => {
    const { Events } = require('discord.js');
    client.once(Events.InteractionCreate, async interaction => {
        if (!interaction.isCommand()) return;

        const callcommand = command.getLoadCommands().get(interaction.commandName);  // mapの方が欲しい
        if (!callcommand) return;

        try {
            await callcommand.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
        }
    });
};
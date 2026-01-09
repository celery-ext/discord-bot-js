const { loadCommands } = require('../core/commandload');
const commands = loadCommands('../commands');
module.exports = (client) => {
    const { Events } = require('discord.js');
    client.once(Events.InteractionCreate, async interaction => {
        if (!interaction.isCommand()) return;

        const command = commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
        }
    });
};
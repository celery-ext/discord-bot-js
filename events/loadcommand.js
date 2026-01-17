const { Commands,registercommands } = require('../core/commandload');
const command = new Commands('../commands');
const { token, applicationId, guildId }= require('../core/config');

registercommands(token, applicationId, guildId, command.getRegistCommands());

module.exports = (client) => {
    const { Events } = require('discord.js');
    client.once(Events.InteractionCreate, async interaction => {
        if (!interaction.isCommand()) return;

        const command = command.getLoadCommands().get(interaction.commandName);  // mapの方が欲しい
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
        }
    });
};
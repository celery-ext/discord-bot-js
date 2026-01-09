const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('introduction')
		.setDescription('自己紹介をします。'),
	execute: async function(interaction) {
		await interaction.reply('我が名はせろりぼっとなのじゃ！よろしくなのじゃ！');
	},
};
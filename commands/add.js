const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('2つの整数を受け取って加算します')
		.addIntegerOption(option =>
			option.setName('int1')
				.setDescription('最初の整数')
				.setRequired(true)
		)
		.addIntegerOption(option =>
			option.setName('int2')
				.setDescription('2番目の整数')
				.setRequired(true)
		),
	execute: async function (interaction) {
		const a = interaction.options.getInteger('int1');
		const b = interaction.options.getInteger('int2');
		await interaction.reply(`受け取った数値の合計は ${a + b} です`);
	},
}
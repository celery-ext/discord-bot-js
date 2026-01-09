require('dotenv').config();

module.exports = {
	token: process.env.DISCORD_TOKEN,
	applicationId: process.env.APPLICATION_ID,
	guildId: process.env.GUILD_ID
};

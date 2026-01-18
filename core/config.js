require('dotenv').config();

module.exports = {
	Token: process.env.DISCORD_TOKEN,
	ApplicationId: process.env.APPLICATION_ID,
	GuildId: process.env.GUILD_ID
};

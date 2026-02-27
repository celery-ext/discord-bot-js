const client = require('./core/client');
const { Token } = require('./core/config');

// events
require('./events/join')(client);
require('./events/command')(client);
require('./events/ready')(client);
require('./events/test')(client);

// login
client.login(Token);
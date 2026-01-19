const client = require('./core/client');
const { Token } = require('./core/config');

// events
require('./events/loadcommand')(client);
require('./events/ready')(client);

// login
client.login(Token);
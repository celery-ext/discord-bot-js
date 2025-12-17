const client = require('./core/client');
const { token } = require('./core/config');

// events
require('./events/ready')(client);

// login
client.login(token);
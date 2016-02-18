const cluster = require('cluster');
const log = require('../log');
const app = require('./app');

const j = obj => JSON.stringify(obj, null, 2);

log(`Reporting for duty.`);
process.on('message', message => {
    log(`Incoming message: ${j(message)}`);
});

// Workers can share any TCP connection
// In this case it is an HTTP server
app.listen(8000, () => log('App ready at http://localhost:8000/'));

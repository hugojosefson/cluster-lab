const cluster = require('cluster');
const log = require('../log');
const app = require('./app');

const j = obj => JSON.stringify(obj, null, 2);

log(`Reporting for duty.`);
process.on('message', message => {
    log(`Incoming message: ${j(message)}`);
});

app.get('/crash', (req, res) => {
    log('/crash');
    setTimeout(() => asdasd(), 1);
    res.send('ok. crashing...\n');
});

app.get('/long', () => {log('/long....')});

// Workers can share any TCP connection
// In this case it is an HTTP server
const server = app.listen(8000, () => log('App ready at http://localhost:8000/'));

process.on('uncaughtException', err => {
    process.send('crashing');
    server.close(err => {
        if (err) {
            log.error('Could not close express app', err);
            process.exit(2);
        } else {
            process.exit(1);
        }
    });
    cluster.worker.disconnect();
    log.error('uncaughtException', err);
});

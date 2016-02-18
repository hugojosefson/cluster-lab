const cluster = require('cluster');
const express = require('express');

const j = obj => JSON.stringify(obj, null, 2);

const log = message => console.log(`${`Worker ${j(cluster.worker.id)}`}: ${message}`);
log(`Reporting for duty.`);
process.on('message', message => {
    log(`Incoming message: ${j(message)}`);
});

// Workers can share any TCP connection
// In this case it is an HTTP server
const app = express();
app.get('/', (req, res) => res.send(`Hello world. This is worker ${cluster.worker.id}.\n`));
app.listen(8000, () => log('App ready at http://localhost:8000/'));

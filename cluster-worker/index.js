const cluster = require('cluster');
const http = require('http');

const j = obj => JSON.stringify(obj, null, 2);

module.exports = () => {
    const log = message => console.log(`${`Worker ${j(cluster.worker.id)}`}: ${message}`);
    log(`reporting for duty`);
    process.on('message', message => {
        log(`incoming message: ${j(message)}`);
    });
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello world. This is worker ${cluster.worker.id}.\n`);
    }).listen(8000);
};

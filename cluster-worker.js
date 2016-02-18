const cluster = require('cluster');
const http = require('http');

module.exports = () => {
    console.log(`worker ${JSON.stringify(cluster.worker.id, null, 2)} reporting for duty`);
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`Hello world. This is worker ${cluster.worker.id}.\n`);
    }).listen(8000);
};
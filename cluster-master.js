const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

module.exports = ()=>{

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
};
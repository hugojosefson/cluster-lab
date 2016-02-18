const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const log = require('../log');
const adminApp = require('./admin-app');

adminApp.listen(8001, ()=> {
    log('Cluster admin API ready at http://localhost:8001/');
});

cluster.on('exit', (worker, code, signal) => {
    log(`Worker ${worker.process.pid} died with exit code ${code} because of signal ${signal}`);
    cluster.fork();
});

// Fork workers.
for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
}

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const log = require('../log');
const adminApp = require('./admin-app');

adminApp.listen(8001, ()=> {
    log('Cluster admin API ready at http://localhost:8001/');
});

/**
 * worker.id -> timeout id for killing it
 */
const crashingWorkers = new Map();

const messageHandler = worker => message => {
    log(`message "${message}" from worker ${worker.id}`);
    if (message === 'crashing') {
        log(`Worker ${worker.id} with PID ${worker.process.pid} is crashing. Disconnecting it...`);
        crashingWorkers.set(worker.id, setTimeout(() => {log(`Worker ${worker.id} with PID ${worker.process.pid} hasn't disconnected after 2 seconds. Killing it...`); worker.kill();}, 2000));
        worker.disconnect();
        forkNewWorker();
    }
};

const forkNewWorker = () => {
    log('Forking a new worker...');
    const worker = cluster.fork();
    worker.on('message', messageHandler(worker));
};

cluster.on('disconnect', worker => {
    log(`Worker ${worker.id} with PID ${worker.process.pid} disconnected.`);
});

cluster.on('exit', (worker, code, signal) => {
    log(`Worker ${worker.id} with PID ${worker.process.pid} died with exit code ${code} because of signal ${signal}`);
    if (crashingWorkers.has(worker.id)) {
        clearTimeout(crashingWorkers.get(worker.id));
        crashingWorkers.delete(worker.id);
        // already forked when putting it in crashingWorkers, so not forking another one.
    } else {
        forkNewWorker();
    }
});

// Fork workers.
for (var i = 0; i < numCPUs; i++) {
    forkNewWorker();
}

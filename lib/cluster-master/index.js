const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const express = require('express');
const bodyParser = require('body-parser');

const log = require('../log');

const formatWorkers = workers => Object.keys(workers)
    .map(id => workers[id])
    .map(formatWorker);

const formatWorker = worker => ({
    _links: {
        parent: {href: `http://localhost:8001/workers`},
        self: {href: `http://localhost:8001/workers/${worker.id}`},
        messages: {href: `http://localhost:8001/workers/${worker.id}/messages`}
    },
    id: worker.id,
    pid: worker.process.pid,
    isConnected: worker.isConnected(),
    isDead: worker.isDead(),
    suicide: worker.suicide
});

cluster.on('exit', (worker, code, signal) => {
    log(`Worker ${worker.process.pid} died with exit code ${code} because of signal ${signal}`);
    cluster.fork();
});

// Fork workers.
for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
}

const adminApp = express();
adminApp.use(bodyParser.json());
adminApp.get('/', (req, res) => res.send({_links: {workers: {href: 'http://localhost:8001/workers'}}}));
adminApp.get('/workers', (req, res) => res.send({
    _links: {self: {href: 'http://localhost:8001/workers'}},
    workers: formatWorkers(cluster.workers)
}));
adminApp.get('/workers/:id', (req, res) => {
    const worker = cluster.workers[req.params.id];
    if (!worker) {
        return res.sendStatus(404);
    }
    res.send(formatWorker(worker));
});
adminApp.post('/workers/:id/messages', (req, res) => {
    const worker = cluster.workers[req.params.id];
    if (!worker) {
        return res.sendStatus(404);
    }
    worker.send(req.body, null, err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(204);
        }
    });
});

adminApp.listen(8001, ()=> {
    log('Cluster admin API ready at http://localhost:8001/');
});

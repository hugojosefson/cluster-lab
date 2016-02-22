import cluster from 'cluster';
import formatWorker from '../format-worker';

module.exports = (req, res) => {
    const worker = cluster.workers[req.params.id];
    if (!worker) {
        return res.sendStatus(404);
    }
    res.send(formatWorker(worker));
};

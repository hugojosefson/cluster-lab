import cluster from 'cluster';
import formatWorkers from '../format-workers';

module.exports = (req, res) => res.send({
    _links: {
        self: {href: 'http://localhost:8001/workers'}
    },
    workers: formatWorkers(cluster.workers)
});

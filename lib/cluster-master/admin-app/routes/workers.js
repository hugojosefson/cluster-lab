const cluster = require('cluster');
const formatWorkers = require('../format-workers');

module.exports = (req, res) => res.send({
    _links: {
        self: {href: 'http://localhost:8001/workers'}
    },
    workers: formatWorkers(cluster.workers)
});
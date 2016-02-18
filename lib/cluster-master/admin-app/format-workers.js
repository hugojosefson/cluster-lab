const formatWorker = require('./format-worker');

module.exports = workers => Object.keys(workers)
    .map(id => workers[id])
    .map(formatWorker);
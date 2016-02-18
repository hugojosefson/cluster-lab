const cluster = require('cluster');

const prefix = (()=> {
    if (cluster.isMaster) {
        return `Master: `;
    } else if (cluster.isWorker) {
        return `Worker ${cluster.worker.id}: `;
    } else {
        return '';
    }
})();

const info = (message, ...rest) => console.log(`${prefix}${message}`, ...rest);
const error = (message, ...rest) => console.error(`${prefix}${message}`, ...rest);

const log = (...args) => info(...args);
log.info = info;
log.error = error;

module.exports = log;

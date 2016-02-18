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

module.exports = message => console.log(`${prefix}${message}`);
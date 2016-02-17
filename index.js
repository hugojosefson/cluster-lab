#!/usr/bin/env node

const cluster = require('cluster');

if (cluster.isMaster) {
    require('./cluster-master')();
} else {
    require('./cluster-worker')()
}

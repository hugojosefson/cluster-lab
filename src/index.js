#!/usr/bin/env node
import cluster from 'cluster';
import clusterStability from 'express-cluster-stability';

clusterStability(({log}) => {
    return require('./cluster-worker')(log);
});

if (cluster.isMaster) {
    require('./cluster-master');
}

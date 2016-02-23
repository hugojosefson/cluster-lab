#!/usr/bin/env node
import cluster from 'cluster';
import clusterStability from 'express-cluster-stability';

clusterStability(
    ({log}) => require('./cluster-worker')(log),
    null,
    ({log}) => require('./cluster-master')(log)
);

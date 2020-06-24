#!/usr/bin/env node
import clusterStability from 'express-cluster-stability'
import worker from './cluster-worker/index.mjs'
import master from './cluster-master/index.mjs'

clusterStability(
  ({ log }) => worker(log),
  null,
  ({ log }) => master(log)
)

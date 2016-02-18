const cluster = require('cluster');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send(`Hello world. This is worker ${cluster.worker.id}.\n`));

module.exports = app;
import express from 'express';
import {processName} from 'express-cluster-stability';

const app = express();
app.get('/', (req, res) => res.send(`Hello world. This is ${processName}.\n`));

module.exports = app;

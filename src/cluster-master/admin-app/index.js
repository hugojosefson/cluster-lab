const express = require('express');
const bodyParser = require('body-parser');

const routeRoot = require('./routes/root');
const routeWorkers = require('./routes/workers');
const routeWorkersId = require('./routes/workers-id');
const routeWorkersIdMessagesPost = require('./routes/workers-id-messages-post');

const adminApp = express();
adminApp.use(bodyParser.json());
adminApp.get('/', routeRoot);
adminApp.get('/workers', routeWorkers);
adminApp.get('/workers/:id', routeWorkersId);
adminApp.post('/workers/:id/messages', routeWorkersIdMessagesPost);

module.exports = adminApp;

import express from 'express';
import bodyParser from 'body-parser';

import routeRoot from './routes/root';
import routeWorkers from './routes/workers';
import routeWorkersId from './routes/workers-id';
import routeWorkersIdMessagesPost from './routes/workers-id-messages-post';

const adminApp = express();
adminApp.use(bodyParser.json());
adminApp.get('/', routeRoot);
adminApp.get('/workers', routeWorkers);
adminApp.get('/workers/:id', routeWorkersId);
adminApp.post('/workers/:id/messages', routeWorkersIdMessagesPost);

module.exports = adminApp;

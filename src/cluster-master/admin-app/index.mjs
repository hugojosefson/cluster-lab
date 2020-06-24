import express from 'express'
import bodyParser from 'body-parser'

import routeRoot from './routes/root.mjs'
import routeWorkers from './routes/workers.mjs'
import routeWorkersId from './routes/workers-id.mjs'
import routeWorkersIdMessagesPost from './routes/workers-id-messages-post.mjs'

const adminApp = express()
adminApp.use(bodyParser.json())
adminApp.get('/', routeRoot)
adminApp.get('/workers', routeWorkers)
adminApp.get('/workers/:id', routeWorkersId)
adminApp.post('/workers/:id/messages', routeWorkersIdMessagesPost)

export default adminApp

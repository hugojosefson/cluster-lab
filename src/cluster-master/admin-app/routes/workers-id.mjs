import cluster from 'cluster'
import formatWorker from '../format-worker.mjs'

export default (req, res) => {
  const worker = cluster.workers[req.params.id]
  if (!worker) {
    return res.sendStatus(404)
  }
  res.send(formatWorker(worker))
}

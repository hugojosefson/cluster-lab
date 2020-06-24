import cluster from 'cluster'
import formatWorkers from '../format-workers.mjs'

export default (req, res) =>
  res.send({
    _links: {
      self: { href: 'http://localhost:8001/workers' },
    },
    workers: formatWorkers(cluster.workers),
  })

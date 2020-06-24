import cluster from 'cluster'

export default (req, res) => {
  const worker = cluster.workers[req.params.id]
  if (!worker) {
    return res.sendStatus(404)
  }
  worker.send(req.body, null, err => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.sendStatus(204)
    }
  })
}

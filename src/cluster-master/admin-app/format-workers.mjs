import formatWorker from './format-worker.mjs'

export default workers =>
  Object.keys(workers)
    .map(id => workers[id])
    .map(formatWorker)

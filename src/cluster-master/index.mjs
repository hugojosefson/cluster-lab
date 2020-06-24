import adminApp from './admin-app/index.mjs'

export default log =>
  adminApp.listen(8001, () =>
    log('Cluster admin API ready at http://localhost:8001/')
  )

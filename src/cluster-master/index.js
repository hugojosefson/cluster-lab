import adminApp from './admin-app';

export default log => adminApp.listen(8001, () => log('Cluster admin API ready at http://localhost:8001/'));

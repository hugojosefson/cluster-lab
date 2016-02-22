import {log} from 'express-cluster-stability';
import adminApp from './admin-app';

adminApp.listen(8001, () => {
    log('Cluster admin API ready at http://localhost:8001/');
});

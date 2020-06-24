# cluster-lab

Trying out the [cluster](https://nodejs.org/api/cluster.html#cluster_cluster)
module in Node.js.

## Prerequisites

- Node.js (a recent version); install via
  [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
- `yarn`; Install with `npm install -g yarn@latest`.

## Install

```bash
git clone https://github.com/hugojosefson/cluster-lab.git
cd cluster-lab
yarn
```

## Use

```bash
yarn start

> cluster-lab@1.0.0 start /surviving-data/code/cluster-lab
> node lib

Master: Cluster admin API ready at http://localhost:8001/
Worker 1: Reporting for duty.
Worker 1: App ready at http://localhost:8000/
Worker 5: Reporting for duty.
Worker 2: Reporting for duty.
Worker 5: App ready at http://localhost:8000/
Worker 4: Reporting for duty.
Worker 2: App ready at http://localhost:8000/
Worker 4: App ready at http://localhost:8000/
Worker 6: Reporting for duty.
Worker 3: Reporting for duty.
Worker 6: App ready at http://localhost:8000/
Worker 3: App ready at http://localhost:8000/
Worker 8: Reporting for duty.
Worker 7: Reporting for duty.
Worker 8: App ready at http://localhost:8000/
Worker 7: App ready at http://localhost:8000/
```

You can then browse the Cluster admin API at
[http://localhost:8001/](http://localhost:8001/) and also check in on a worker
at [http://localhost:8000/](http://localhost:8000/).

Each time you request [http://localhost:8000/](http://localhost:8000/), you
should get a separate worker (round-robin style).

Try killing one or more of the workers. Check their process id (pid) using the
Cluster admin API. Then use `kill` in a different terminal to kill the worker,
and see that the cluster master spins up a new worker.

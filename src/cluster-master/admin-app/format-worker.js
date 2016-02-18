module.exports = worker => ({
    _links: {
        parent: {href: `http://localhost:8001/workers`},
        self: {href: `http://localhost:8001/workers/${worker.id}`},
        messages: {href: `http://localhost:8001/workers/${worker.id}/messages`}
    },
    id: worker.id,
    pid: worker.process.pid,
    isConnected: worker.isConnected(),
    isDead: worker.isDead(),
    suicide: worker.suicide
});
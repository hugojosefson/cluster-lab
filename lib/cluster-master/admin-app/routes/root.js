module.exports = (req, res) => res.send({
    _links: {
        workers: {href: 'http://localhost:8001/workers'}
    }
});

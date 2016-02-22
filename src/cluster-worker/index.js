import app from './app';

export default log => {

    const j = obj => JSON.stringify(obj, null, 2);

    log(`Reporting for duty.`);
    process.on('message', message => {
        log(`Incoming message: ${j(message)}`);
    });

    app.get('/crash', (req, res) => {
        log('/crash');
        setTimeout(() => asdasd(), 1);
        res.send('ok. crashing...\n');
    });

    app.get('/long', () => {log('/long....')});

    return app.listen(8000, () => log('App ready at http://localhost:8000/'));
}

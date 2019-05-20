const express = require('express');
const app = express();
const channels = require('./channels');
const parser = require('body-parser');

module.exports = (stream) => {
    app.use(parser.urlencoded({extended: true}));
    app.use(parser.json());

    app.use('/', express.static('./public'));
    app.get('/api/channels', (req, res) => res.json(channels));
    app.get('/api/status', (req, res) => res.json(stream.status()));

    app.post('/api/change', (req, res) => {
        const id = req.body.id;
        const channel = channels.channels[id];
        stream.change(channel.url);
        res.json({ok: true});
    });

    app.listen(8080);
};
const exec = require('execa');
const config = require('./config');
const isPortReachable = require('is-port-reachable');

let sopcast = false;
let vlc = false;

process.on('exit', function () {
    sopcast && sopcast.kill();
    vlc && vlc.kill();
});

async function streamSopcast(url) {
    sopcast && sopcast.kill();

    try {
        sopcast = exec(config.sopcastPath, [url, '3908', '8902']);
    } catch(e) {
        console.log(e);
    }
}

async function streamVlc() {
    vlc && vlc.kill();

    const ok = await isPortReachable(8902, {host: 'localhost'});

    if (!ok) {
        setTimeout(() => streamVlc(), 300);
    } else {
        vlc = exec(config.vlcPath,[
            'http://127.0.0.1:8902',
            '--http-reconnect',
            '--sout=#chromecast',
            '--loop',
            '--repeat',
            '--sout-keep',
            '--network-caching=30000',
            `--sout-chromecast-ip=${config.chromecastIp}`,
            '--demux-filter=demux_chromecast',
            '-I dummy --dummy-quiet'
        ]);
    }
}

module.exports = {
    start() {
        //streamSopcast('sop://185.45.113.76:3912/264952');
        //streamVlc();
    },
    change(url) {
        streamSopcast(url);
        streamVlc();
    },
    status() {
        return {
            status: 1
        }
    }
};
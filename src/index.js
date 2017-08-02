const EventEmitter = require('events');
const MemoryBackend = require('./lib/ChannelManager/backends/Memory');
const ChannelManager = require('./lib/ChannelManager');
const uuidv4 = require('uuid/v4');
const {Server} = require('ws');

const wss = new Server({
    port: 8080,
});

class Client extends EventEmitter
{
    constructor(conn) {
        super();
        this.conn = conn;

        this.conn.on('message', message => {
            this.emit('message', JSON.parse(message));
        });
    }

    send(message) {
        this.conn.send(JSON.stringify(message));
    }
}

const channels = new Map();

wss.on('connection', function connection(conn) {
    const client = new Client(conn);

    client.on('message', function incoming(data) {
        console.log('Data', data);

        if (data.type === 'create') {
            const id = uuidv4();
            channels.set(id, data.desc);
            client.send({
                type: 'channel-id',
                id,
            });
        } else if (data.type === 'join') {
            client.send({
                type: 'channel-description',
                desc: channels.get(data.id),
            });
        }
    });
});
